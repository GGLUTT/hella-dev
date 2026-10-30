"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __lutiyLoaded?: boolean;
  }
}

const LOADED_EVENT = "lutiy:loaded";
const MIN_VISIBLE_MS = 1900; // fill (1.5s) + dot pop
const SEEN_KEY = "lutiy-intro";
const EXIT_MS = 900;

/** True once the intro loader has started to leave — hero animations key off it. */
export function useLoaderDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.__lutiyLoaded) return setDone(true);
    const on = () => setDone(true);
    window.addEventListener(LOADED_EVENT, on);
    const fallback = setTimeout(on, 5000);
    return () => {
      window.removeEventListener(LOADED_EVENT, on);
      clearTimeout(fallback);
    };
  }, []);
  return done;
}

/**
 * Brand intro: a pill fills left-to-right over the "Lutiy agency" wordmark,
 * the emerald dot pops, then the curtain lifts. The fill runs on pure CSS so it
 * starts with the first paint, before React hydrates.
 */
export default function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "exit" | "gone">("loading");

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Intro plays once per session; later visits get the page instantly (better LCP).
    let seen = root.classList.contains("intro-seen");
    try {
      seen = seen || !!sessionStorage.getItem(SEEN_KEY); // client-side return to "/"
    } catch {}
    if (seen) {
      window.__lutiyLoaded = true;
      window.dispatchEvent(new Event(LOADED_EVENT));
      setPhase("gone");
      return;
    }
    root.classList.add("is-loading");
    window.__lenis?.stop();

    const pageLoaded = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });
    const minTime = new Promise<void>((res) =>
      setTimeout(res, reduced ? 0 : Math.max(0, MIN_VISIBLE_MS - performance.now()))
    );
    // never hold the page hostage on a slow network
    const cap = new Promise<void>((res) => setTimeout(res, 3500));

    let exitTimer: ReturnType<typeof setTimeout>;
    Promise.race([Promise.all([pageLoaded, minTime]), cap]).then(() => {
      setPhase("exit");
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      root.classList.remove("is-loading");
      window.__lenis?.start();
      window.__lutiyLoaded = true;
      window.dispatchEvent(new Event(LOADED_EVENT));
      exitTimer = setTimeout(() => setPhase("gone"), reduced ? 0 : EXIT_MS);
    });

    return () => {
      clearTimeout(exitTimer);
      root.classList.remove("is-loading");
    };
  }, []);

  if (phase === "gone") return null;

  const wordmark = (
    <>
      <span className="loader-mark">L</span>
      <span className="loader-word">
        utiy<span className="loader-word-light">agency</span>
      </span>
    </>
  );

  return (
    <div
      role="status"
      aria-label="Lutiy agency — завантаження"
      className={`site-loader ${phase === "exit" ? "is-exiting" : ""}`}
    >
      <div className="loader-row">
        <div className="loader-pill">
          {/* dim base */}
          <div className="loader-pill-inner loader-base">{wordmark}</div>
          {/* filled layer, revealed by an animated clip */}
          <div aria-hidden className="loader-pill-inner loader-fill">
            {wordmark}
          </div>
        </div>
        <span aria-hidden className="loader-dot">
          <span />
        </span>
      </div>
    </div>
  );
}
