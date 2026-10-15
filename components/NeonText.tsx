"use client";

import { useEffect, useRef } from "react";

/**
 * Neon-sign text: flickers on like a lamp when it scrolls into view, then hums
 * with an occasional stutter; a couple of "faulty" letters blink on their own.
 * Only opacity is animated (compositor-only), the glow itself is static.
 */
export default function NeonText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-on");
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const letters = Array.from(text);
  const faulty = new Set([1, Math.max(letters.length - 3, 2)]);

  return (
    <span ref={ref} className={`neon ${className}`} aria-label={text}>
      {letters.map((ch, i) => (
        <span key={i} aria-hidden className={faulty.has(i) ? "neon-faulty" : undefined}>
          {ch}
        </span>
      ))}
    </span>
  );
}
