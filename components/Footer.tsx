"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLang } from "@/context/LangContext";
import {
  GithubIcon,
  LinkedinIcon,
  Mail01Icon,
  NewTwitterIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

const socials = [
  { href: "https://github.com/", label: "GitHub", icon: GithubIcon },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://x.com/", label: "X / Twitter", icon: NewTwitterIcon },
  { href: "mailto:hello@hella.dev", label: "Email", icon: Mail01Icon },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-black">
      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[85%] -translate-x-1/2 rounded-[100%] bg-emerald-500/[0.06] blur-3xl"
      />
      {/* Hairline accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto max-w-5xl px-6 pb-10 pt-24 md:pt-32"
      >
        {/* Eyebrow */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40"
        >
          <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent to-white/40" />
          {t("Let's build", "Let's build")}
          <span className="inline-block h-px w-8 bg-gradient-to-l from-transparent to-white/40" />
        </motion.div>

        {/* Headline — no gradient */}
        <motion.h2
          variants={item}
          className="mt-6 text-center text-balance text-[40px] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {t("Маєш ідею?", "Have an idea?")}
          <br />
          <span className="text-white/40">{t("Запустимо її.", "Let's launch it.")}</span>
        </motion.h2>

        {/* Email pill */}
        <motion.div
          variants={item}
          className="mt-10 flex justify-center"
        >
          <a
            href="mailto:hello@hella.dev"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
          >
            hello@hella.dev
            <span className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} />
            </span>
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          variants={item}
          className="mt-8 flex items-center justify-center gap-2"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/65 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            >
              <HugeiconsIcon icon={s.icon} size={15} />
            </a>
          ))}
        </motion.div>

        {/* Hairline */}
        <motion.div
          variants={item}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* Bottom strip */}
        <motion.div
          variants={item}
          className="mt-6 flex flex-col items-center justify-between gap-2 text-[11px] text-white/40 sm:flex-row"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.04] font-mono text-[9px] font-bold text-white/70">
              YL
            </span>
            <span>
              © {new Date().getFullYear()} {t("Євгеній Лютий · Hella", "Yevhenii Liutyi · Hella")}
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono uppercase tracking-[0.25em]">
            <Link href="/privacy" className="transition hover:text-white/60">
              Privacy
            </Link>
            <span className="text-white/15">·</span>
            <Link href="/cookies" className="transition hover:text-white/60">
              Cookies
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
