"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  Calendar03Icon,
  Clock01Icon,
  Mail01Icon,
  MagicWand01Icon,
} from "@hugeicons/core-free-icons";

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const name = params.get("name") || "друже";
  const type = params.get("type") || "consult";
  const heading = useMemo(
    () => (type === "call" ? "Скоро узгодимо дзвінок" : "Заявку отримано"),
    [type],
  );

  // Confetti pieces — mix of squares and small circles
  const [confetti, setConfetti] = useState<
    {
      x: number;
      rot: number;
      delay: number;
      color: string;
      dx: number;
      shape: "sq" | "ci";
      size: number;
      dur: number;
    }[]
  >([]);
  useEffect(() => {
    const colors = [
      "#6ee7b7",
      "#7dd3fc",
      "#fbcfe8",
      "#fde68a",
      "#c4b5fd",
      "#ffffff",
    ];
    const items = Array.from({ length: 56 }).map((_, i) => ({
      x: 50 + (Math.random() - 0.5) * 60,
      rot: (Math.random() - 0.5) * 900,
      delay: Math.random() * 0.6,
      dx: (Math.random() - 0.5) * 800,
      color: colors[i % colors.length],
      shape: (Math.random() > 0.5 ? "sq" : "ci") as "sq" | "ci",
      size: 4 + Math.random() * 8,
      dur: 2.2 + Math.random() * 1.6,
    }));
    setConfetti(items);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-32">
      {/* Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[200px]"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.5, 0.25, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-sky-500/15 blur-[160px]"
      />

      {/* Confetti */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-screen overflow-hidden"
      >
        {confetti.map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -20, x: 0, rotate: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: ["0vh", "75vh"],
              x: c.dx,
              rotate: c.rot,
              scale: 1,
            }}
            transition={{
              duration: c.dur,
              delay: 0.4 + c.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              left: `${c.x}%`,
              top: "18%",
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              borderRadius: c.shape === "ci" ? "50%" : "2px",
            }}
            className="absolute"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-2xl text-center">
        {/* Animated check mark with double pulse rings */}
        <motion.div
          initial={{ scale: 0, rotate: -30, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
          className="relative mx-auto flex h-36 w-36 items-center justify-center"
        >
          {/* Pulse rings */}
          {[0, 0.6].map((d, idx) => (
            <motion.span
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{
                duration: 1.8,
                delay: 0.5 + d,
                repeat: Infinity,
                repeatDelay: 0.4,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full border-2 border-emerald-300"
            />
          ))}
          {/* Glow */}
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-300/40 to-sky-300/25 blur-2xl"
          />
          {/* Inner circle */}
          <span className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-emerald-300 to-sky-300 shadow-[0_24px_70px_-10px_rgba(110,231,183,0.7)]">
            <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
              <motion.path
                d="M12 24L21 33L37 16"
                stroke="black"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.65,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </svg>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-balance text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Дякую,{" "}
          <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
            {name}
          </span>
          !
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-lg text-white/60 md:text-xl"
        >
          {heading}. Звʼяжуся з тобою найближчим часом.
        </motion.p>

        {/* Next steps */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 1 } },
          }}
          className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-3"
        >
          <Step
            icon={<HugeiconsIcon icon={Mail01Icon} size={16} />}
            title="Перевір пошту"
            hint="Підтвердження протягом 5 хв"
          />
          <Step
            icon={<HugeiconsIcon icon={Clock01Icon} size={16} />}
            title="До 24 годин"
            hint="Відповім особисто"
          />
          <Step
            icon={<HugeiconsIcon icon={Calendar03Icon} size={16} />}
            title={type === "call" ? "Узгодимо час" : "Брифу не треба"}
            hint={
              type === "call"
                ? "Підберу зручний слот"
                : "Все обговоримо листуванням"
            }
          />
        </motion.div>

        {/* Sparkle hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-10 inline-flex items-center gap-2 text-xs text-white/45"
        >
          <span className="text-emerald-300">
            <HugeiconsIcon icon={MagicWand01Icon} size={12} />
          </span>
          Пропозиція буде персональною — без шаблонних відповідей
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/[0.08]"
          >
            <span className="transition group-hover:-translate-x-0.5">
              <HugeiconsIcon icon={ArrowLeft02Icon} size={14} />
            </span>
            На головну
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

function Step({
  icon,
  title,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  hint: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { y: 16, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-emerald-300">
        {icon}
      </span>
      <div className="mt-3 text-sm font-medium text-white">{title}</div>
      <div className="mt-1 text-xs text-white/50">{hint}</div>
    </motion.div>
  );
}
