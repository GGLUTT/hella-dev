import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — Hella Dev",
  description: "Як і чому ми використовуємо cookies на сайті hella.dev.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#07070a] px-6 py-24">
      <div className="mx-auto max-w-2xl">
        {/* Back */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/40 transition hover:text-white/70"
        >
          <span>←</span> На головну
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/35">
            <span className="inline-block h-px w-6 bg-white/25" />
            Правова інформація
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-3 text-sm text-white/40">
            Оновлено: травень 2025
          </p>
        </div>

        {/* Hairline */}
        <div className="mb-10 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

        {/* Content */}
        <div className="space-y-8 text-[15px] leading-relaxed text-white/60">
          <Section title="Що таке cookies?">
            Cookies — невеликі текстові файли, що зберігаються у вашому браузері, коли ви відвідуєте
            сайт. Вони дозволяють сайту запам'ятовувати ваші дії та налаштування.
          </Section>

          <Section title="Які cookies ми використовуємо">
            <ul className="mt-3 space-y-3">
              {[
                {
                  name: "cookie-consent",
                  type: "Необхідний",
                  desc: "Зберігає ваш вибір щодо cookies. Термін: 365 днів.",
                },
                {
                  name: "_ga, _ga_*",
                  type: "Аналітика",
                  desc: "Google Analytics — збирає анонімну статистику відвідувань.",
                },
              ].map((c) => (
                <li
                  key={c.name}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-white/80">{c.name}</span>
                    <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/40">
                      {c.type}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/45">{c.desc}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Як відмовитись від cookies">
            Ви можете відхилити cookies через банер при першому відвідуванні або очистити їх
            вручну в налаштуваннях браузера. Також можна скористатись інструментами для
            відмови від відстеження, як-от{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 underline underline-offset-2 transition hover:text-white"
            >
              Google Analytics Opt-out
            </a>
            .
          </Section>

          <Section title="Сторонні сервіси">
            Ми можемо використовувати сторонні скрипти (аналітика, шрифти). Ці сервіси мають
            власні політики cookies і ми не контролюємо їх поведінку.
          </Section>

          <Section title="Зміни в політиці">
            Ми можемо оновлювати цю сторінку. Нова версія набирає чинності з моменту публікації.
          </Section>

          <Section title="Контакт">
            Питання? Пишіть:{" "}
            <a
              href="mailto:hello@hella.dev"
              className="text-white/70 underline underline-offset-2 transition hover:text-white"
            >
              hello@hella.dev
            </a>
          </Section>
        </div>

        {/* Footer links */}
        <div className="mt-16 flex items-center gap-6 text-[11px] text-white/30">
          <Link href="/privacy" className="transition hover:text-white/60">
            Privacy Policy →
          </Link>
          <Link href="/" className="transition hover:text-white/60">
            hella.dev →
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-2 font-display text-base font-semibold tracking-tight text-white/90">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
