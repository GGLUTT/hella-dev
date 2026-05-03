"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ua" | "en";

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (ua: string, en: string) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: "ua",
  toggleLang: () => {},
  t: (ua) => ua,
});

function applyLang(lang: Lang) {
  document.documentElement.lang = lang === "ua" ? "uk" : "en";
  localStorage.setItem("lang", lang);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ua");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    const resolved: Lang = stored === "en" ? "en" : "ua";
    setLang(resolved);
    applyLang(resolved);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((current) => {
      const next: Lang = current === "ua" ? "en" : "ua";
      applyLang(next);
      return next;
    });
  }, []);

  const t = useCallback(
    (ua: string, en: string) => (lang === "ua" ? ua : en),
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
