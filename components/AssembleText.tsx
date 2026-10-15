"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

type Props = {
  text: string;
  /** split into letters (headlines) or words (body copy) */
  by?: "char" | "word";
  /** how far pieces start from home, in px */
  spread?: number;
  className?: string;
};

// Deterministic pseudo-random in [-1, 1] — identical on server and client.
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

/**
 * Text that assembles itself from scattered "molecules" as it scrolls into view.
 * Scroll-linked, but cheap: one scroll subscription per block writes
 * transform/opacity straight to the pieces (no React re-render, no filters).
 * The real text stays in the DOM for SEO and screen readers.
 */
export default function AssembleText({ text, by = "char", spread = 70, className }: Props) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const piecesRef = useRef<HTMLSpanElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 98%", "start 40%"],
  });

  const words = text.split(" ");
  let pieceIndex = 0;

  useEffect(() => {
    const pieces = piecesRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pieces.forEach((el) => {
        el.style.transform = "none";
        el.style.opacity = "1";
      });
      return;
    }
    const n = pieces.length;
    const meta = pieces.map((_, i) => ({
      dx: rand(i, 1) * spread,
      dy: rand(i, 2) * spread * 0.8,
      rot: rand(i, 3) * 40,
      // pieces settle in a loose left-to-right wave
      delay: (i / Math.max(n - 1, 1)) * 0.35 + (rand(i, 4) + 1) * 0.08,
    }));

    let last = -1;
    const apply = (p: number) => {
      if (Math.abs(p - last) < 0.001) return;
      last = p;
      for (let i = 0; i < n; i++) {
        const m = meta[i];
        const local = Math.min(Math.max((p - m.delay) / 0.5, 0), 1);
        const e = 1 - Math.pow(1 - local, 3);
        const k = 1 - e;
        const el = pieces[i];
        el.style.transform = `translate3d(${m.dx * k}px, ${m.dy * k}px, 0) rotate(${m.rot * k}deg) scale(${0.35 + 0.65 * e})`;
        el.style.opacity = String(e);
      }
    };

    apply(scrollYProgress.get());
    return scrollYProgress.on("change", apply);
  }, [scrollYProgress, spread, text]);

  piecesRef.current = [];

  return (
    <span ref={rootRef} className={className} aria-label={text} role="text">
      {words.map((word, wi) => {
        const wordIdx = by === "word" ? pieceIndex++ : -1;
        return (
        <span key={wi}>
        <span aria-hidden className="inline-block whitespace-nowrap">
          {by === "word" ? (
            <span
              ref={(el) => {
                if (el) piecesRef.current[wordIdx] = el;
              }}
              className="inline-block will-change-transform"
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ) : (
            Array.from(word).map((ch, ci) => {
              const idx = pieceIndex++;
              return (
                <span
                  key={ci}
                  ref={(el) => {
                    if (el) piecesRef.current[idx] = el;
                  }}
                  className="inline-block will-change-transform"
                  style={{ opacity: 0 }}
                >
                  {ch}
                </span>
              );
            })
          )}
        </span>
        {wi < words.length - 1 ? " " : null}
        </span>
        );
      })}
    </span>
  );
}
