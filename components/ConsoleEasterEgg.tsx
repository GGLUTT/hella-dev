"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const art = `
%c
██╗   ██╗███████╗██╗   ██╗██╗  ██╗███████╗███╗   ██╗██╗██╗
╚██╗ ██╔╝██╔════╝██║   ██║██║  ██║██╔════╝████╗  ██║██║██║
 ╚████╔╝ █████╗  ██║   ██║███████║█████╗  ██╔██╗ ██║██║██║
  ╚██╔╝  ██╔══╝  ╚██╗ ██╔╝██╔══██║██╔══╝  ██║╚██╗██║██║██║
   ██║   ███████╗ ╚████╔╝ ██║  ██║███████╗██║ ╚████║██║██║
   ╚═╝   ╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝╚═╝
`;

    console.log(
      art,
      "color: #34d399; font-family: monospace; font-size: 11px; line-height: 1.2;"
    );

    console.log(
      "%cЄвгеній Лютий — Fullstack Developer",
      "color: #fff; font-family: monospace; font-size: 14px; font-weight: bold; letter-spacing: 0.1em;"
    );

    console.log(
      "%c⚡ React · TypeScript · Node.js · PostgreSQL",
      "color: rgba(255,255,255,0.5); font-family: monospace; font-size: 11px;"
    );

    console.log(
      "%c─────────────────────────────────────────────",
      "color: rgba(255,255,255,0.12); font-family: monospace;"
    );

    console.log(
      "%c👀 Ти переглядаєш DevTools? Мені подобається твій стиль.",
      "color: rgba(255,255,255,0.7); font-family: monospace; font-size: 12px;"
    );

    console.log(
      "%c📂 GitHub  → %chttps://github.com/",
      "color: rgba(255,255,255,0.5); font-family: monospace; font-size: 12px;",
      "color: #34d399; font-family: monospace; font-size: 12px; text-decoration: underline;"
    );

    console.log(
      "%c📄 Резюме  → %chttps://hella.dev/resume.pdf",
      "color: rgba(255,255,255,0.5); font-family: monospace; font-size: 12px;",
      "color: #34d399; font-family: monospace; font-size: 12px; text-decoration: underline;"
    );

    console.log(
      "%c✉️  Email   → %chello@hella.dev",
      "color: rgba(255,255,255,0.5); font-family: monospace; font-size: 12px;",
      "color: #34d399; font-family: monospace; font-size: 12px;"
    );

    console.log(
      "%c─────────────────────────────────────────────",
      "color: rgba(255,255,255,0.12); font-family: monospace;"
    );

    console.log(
      "%c🤝 Якщо шукаєш розробника — давай поговоримо.",
      "color: rgba(255,255,255,0.6); font-family: monospace; font-size: 12px; font-style: italic;"
    );
  }, []);

  return null;
}
