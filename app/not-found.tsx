"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import MagneticButton from "@/components/MagneticButton";

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
};

export default function NotFound() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);

  // Coords for the reveal lens
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);

  // Springs for smooth lens inertia
  const smoothLensX = useSpring(lensX, { stiffness: 90, damping: 20 });
  const smoothLensY = useSpring(lensY, { stiffness: 90, damping: 20 });

  // Initialize lens coordinates at the center on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    lensX.set(rect.width / 2);
    lensY.set(rect.height * 0.35);
  }, [lensX, lensY]);

  // Set CSS custom properties on the container for the gradient mask
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

  // 3D Parallax Tilt for the central text block
  const mouseTiltX = useMotionValue(0);
  const mouseTiltY = useMotionValue(0);

  const smoothTiltX = useSpring(mouseTiltX, { stiffness: 60, damping: 20 });
  const smoothTiltY = useSpring(mouseTiltY, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(smoothTiltY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothTiltX, [-0.5, 0.5], [-8, 8]);
  const tiltX = useTransform(smoothTiltX, [-0.5, 0.5], [-12, 12]);
  const tiltY = useTransform(smoothTiltY, [-0.5, 0.5], [-12, 12]);

  const updateCoordinates = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;

    lensX.set(clientX);
    lensY.set(clientY);

    const rect = container.getBoundingClientRect();
    mouseTiltX.set((clientX - rect.left) / rect.width - 0.5);
    mouseTiltY.set((clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="min-h-[100svh] w-full relative bg-zinc-950 overflow-hidden flex flex-col justify-center items-center py-20 px-6 select-none"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "35%",
          "--lens-radius": "140px",
        } as any
      }
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none filter saturate-[1.1] brightness-[0.8]"
      >
        <source src="/new-heros.mp4" type="video/mp4" />
      </video>

      {/* Shroud Overlay (cuts reveal hole via mask) */}
      <div
        style={{
          maskImage: "radial-gradient(circle var(--lens-radius, 140px) at var(--mouse-x) var(--mouse-y), transparent 0%, black 100%)",
          WebkitMaskImage: "radial-gradient(circle var(--lens-radius, 140px) at var(--mouse-x) var(--mouse-y), transparent 0%, black 100%)",
        }}
        className="absolute inset-0 bg-zinc-950/95 z-10 pointer-events-none transition-[mask] duration-75"
      >
        {/* Shroud premium texture grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* Lens Edge Glow boundary */}
      <div
        style={{
          left: "var(--mouse-x)",
          top: "var(--mouse-y)",
          transform: "translate(-50%, -50%)",
          width: "calc(var(--lens-radius, 140px) * 2)",
          height: "calc(var(--lens-radius, 140px) * 2)",
        }}
        className="absolute pointer-events-none z-20 rounded-full border border-cyan-500/20 bg-cyan-500/[0.015] filter blur-[3px]"
      />

      {/* 3D Tilt Parallax Content wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: tiltX,
          y: tiltY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-30 flex flex-col items-center justify-center text-center max-w-4xl pointer-events-none"
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.span
            variants={itemVariants}
            className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-cyan-400/80 uppercase block"
          >
            {t("СТОРІНКУ НЕ ЗНАЙДЕНО", "PAGE NOT FOUND")}
          </motion.span>

          {/* Giant "404" header */}
          <motion.h1
            variants={itemVariants}
            className="text-8xl sm:text-[10rem] md:text-[12rem] font-black tracking-tighter font-display bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-none mt-2"
          >
            404
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base leading-relaxed text-zinc-400 max-w-md mt-6 px-4 text-balance"
          >
            {t(
              "Здається, ви потрапили в темну зону. Ця сторінка не існує або була переміщена.",
              "It looks like you've entered a dark zone. This page does not exist or has been moved."
            )}
          </motion.p>

          {/* Outlined Home CTA Button */}
          <motion.div variants={itemVariants} className="mt-10 pointer-events-auto">
            <MagneticButton
              as={Link as any}
              href="/"
              glowBorder={false}
              strength={0.25}
              className="relative overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 text-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-zinc-900 transition duration-300 flex items-center justify-center"
            >
              <span className="relative z-10">{t("ПОВЕРНУТИСЯ НА ГОЛОВНУ", "RETURN HOME")}</span>
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
    </section>
  );
}
