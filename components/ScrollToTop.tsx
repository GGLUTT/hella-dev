"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp02Icon } from "@hugeicons/core-free-icons";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Show after scrolling past ~80vh
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dash = useTransform(scrollYProgress, [0, 1], [113, 0]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          aria-label="Прокрутити нагору"
          className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center md:bottom-8 md:right-8"
        >
          {/* Progress ring */}
          <svg
            viewBox="0 0 40 40"
            className="absolute inset-0 h-full w-full -rotate-90"
            aria-hidden
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="url(#scroll-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="113"
              style={{ strokeDashoffset: dash }}
            />
            <defs>
              <linearGradient id="scroll-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#7dd3fc" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner button */}
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 backdrop-blur-xl transition group-hover:border-white/30 group-hover:bg-black/80">
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-white"
            >
              <HugeiconsIcon icon={ArrowUp02Icon} size={18} />
            </motion.span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
