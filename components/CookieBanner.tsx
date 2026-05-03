"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept  = () => { localStorage.setItem("cookie-consent", "accepted");  setVisible(false); };
  const decline = () => { localStorage.setItem("cookie-consent", "declined");  setVisible(false); };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{    y: 12, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-[200] w-[calc(100%-2.5rem)] max-w-[320px] sm:bottom-6 sm:right-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          {/* card */}
          <div className="glass relative overflow-hidden rounded-2xl px-5 py-4 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
            {/* top accent */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />

            {/* header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-[7px] w-[7px]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-semibold tracking-tight text-white">
                  Cookies
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                hella.dev
              </span>
            </div>

            {/* divider */}
            <div className="my-3 h-px bg-white/[0.06]" />

            {/* text */}
            <p className="text-[11px] leading-[1.7] text-white/45">
              Використовуємо cookies для аналітики.{" "}
              <Link href="/privacy" className="text-white/60 transition hover:text-white">
                Privacy
              </Link>
              {" · "}
              <Link href="/cookies" className="text-white/60 transition hover:text-white">
                Cookies
              </Link>
            </p>

            {/* buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={accept}
                className="rounded-xl bg-white py-2.5 text-[11px] font-semibold text-black transition hover:bg-white/90 active:scale-[0.97]"
              >
                Прийняти
              </button>
              <button
                onClick={decline}
                className="rounded-xl border border-white/[0.1] py-2.5 text-[11px] font-medium text-white/45 transition hover:border-white/20 hover:text-white/70 active:scale-[0.97]"
              >
                Відхилити
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
