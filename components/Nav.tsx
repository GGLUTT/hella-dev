"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import MagneticButton from "@/components/MagneticButton";
import { useLang } from "@/context/LangContext";


const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut", staggerChildren: 0.06, delayChildren: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang, t } = useLang();

  const navLinks = [
    { href: "#about",    label: t("Про мене",  "About")    },
    { href: "#projects", label: t("Проєкти",   "Projects") },
    { href: "#services", label: t("Послуги",   "Services") },
    { href: "#contact",  label: t("Контакти",  "Contact")  },
  ];

  // Lock body scroll while menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <div className="mx-auto mt-4 max-w-6xl px-4">
          <div className="glass flex items-center justify-between rounded-full px-5 py-2.5">
            <Link
              href="#"
              className="flex items-center gap-2 text-sm font-semibold tracking-wide"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-white" />
              hella<span className="text-white/40">/dev</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Lang toggle */}
              <button
                onClick={toggleLang}
                aria-label="Toggle language"
                className="relative hidden h-8 w-12 overflow-hidden items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-medium tracking-widest text-white/55 transition hover:border-white/20 hover:text-white md:flex"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={lang}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute"
                  >
                    {lang === "ua" ? "EN" : "UA"}
                  </motion.span>
                </AnimatePresence>
              </button>

              <MagneticButton
                href="#contact"
                className="hidden rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition hover:bg-white/90 md:inline-flex"
                strength={0.4}
              >
                {t("Написати", "Contact")}
              </MagneticButton>

              {/* Mobile burger */}
              <button
                aria-label={open ? "Закрити меню" : "Відкрити меню"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.08] md:hidden"
              >
                <Burger open={open} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop blur */}
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Aurora glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-[140px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 bottom-10 h-[380px] w-[380px] rounded-full bg-sky-500/15 blur-[140px]"
            />

            {/* Faint grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              }}
            />

            {/* Menu content */}
            <div className="relative flex h-full flex-col px-6 pb-10 pt-28">
              {/* Eyebrow */}
              <motion.div
                variants={itemVariants}
                className="mb-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/45"
              >
                <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent to-white/50" />
                Меню
              </motion.div>

              {/* Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    variants={itemVariants}
                    className="group flex items-baseline gap-4 border-b border-white/10 py-5"
                  >
                    <span className="font-mono text-xs text-white/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-semibold tracking-tight text-white/90 transition group-hover:text-white">
                      {l.label}
                    </span>
                    <span className="ml-auto text-white/30 transition group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* CTA */}
              <motion.div variants={itemVariants} className="mt-10">
                <MagneticButton
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-base font-medium text-black transition hover:bg-white/90"
                  strength={0.25}
                >
                  {t("Написати", "Contact")}
                </MagneticButton>
              </motion.div>

              {/* Footer mark */}
              <motion.div
                variants={itemVariants}
                className="mt-auto flex items-center justify-between pt-10 text-[10px] uppercase tracking-[0.3em] text-white/40"
              >
                <span>YL // hella</span>
                <div className="flex items-center gap-3">
                  {/* Lang toggle mobile */}
                  <button
                    onClick={toggleLang}
                    aria-label="Toggle language"
                    className="relative h-6 w-10 overflow-hidden rounded-full border border-white/15 text-[9px] tracking-widest text-white/50 transition hover:text-white"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={lang}
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {lang === "ua" ? "EN" : "UA"}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    available
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-5">
      <motion.span
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 block h-[1.5px] w-full rounded-full bg-white"
      />
      <motion.span
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rounded-full bg-white"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 block h-[1.5px] w-full rounded-full bg-white"
      />
    </span>
  );
}
