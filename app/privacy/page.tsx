import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Hella Dev",
  description: "Як ми збираємо, використовуємо і захищаємо ваші дані на hella.dev.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/40">
            Оновлено: травень 2025
          </p>
        </div>

        {/* Hairline */}
        <div className="mb-10 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

        {/* Content */}
        <div className="space-y-8 text-[15px] leading-relaxed text-white/60">
          <Section title="Хто ми">
            Цей сайт належить Євгенію Лютому (hella.dev) — портфоліо та сайт-візитка
            fullstack-розробника. Контакт: hello@hella.dev.
          </Section>

          <Section title="Які дані ми збираємо">
            <ul className="mt-3 space-y-2 text-white/55">
              {[
                "Технічні дані: IP-адреса, тип браузера, ОС, сторінки відвідань, час сесії.",
                "Дані форми: ім'я, email та повідомлення, які ви надсилаєте через контактну форму.",
                "Cookies: деталі у нашій Cookie Policy.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Як ми використовуємо дані">
            <ul className="mt-3 space-y-2 text-white/55">
              {[
                "Відповідь на ваші запити (контактна форма).",
                "Аналітика та покращення сайту (Google Analytics, анонімно).",
                "Безпека і захист від зловживань.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Правова основа (GDPR)">
            Ми обробляємо дані на підставі:{" "}
            <strong className="font-medium text-white/80">
              законного інтересу
            </strong>{" "}
            (аналітика),{" "}
            <strong className="font-medium text-white/80">виконання договору</strong>{" "}
            (відповідь на запити) та{" "}
            <strong className="font-medium text-white/80">вашої згоди</strong> (cookies).
          </Section>

          <Section title="Передача третім сторонам">
            Ми не продаємо і не передаємо ваші дані. Ми використовуємо:
            <ul className="mt-3 space-y-2 text-white/55">
              {[
                "Google Analytics (анонімна аналітика, EU-сервери).",
                "Vercel / Netlify — хостинг (зберігають технічні логи).",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Ваші права (GDPR)">
            Ви маєте право: запитати доступ до даних, виправити їх, видалити,
            обмежити обробку або відкликати згоду. Надішліть запит на{" "}
            <a
              href="mailto:hello@hella.dev"
              className="text-white/70 underline underline-offset-2 transition hover:text-white"
            >
              hello@hella.dev
            </a>
            .
          </Section>

          <Section title="Зберігання даних">
            Дані аналітики зберігаються 26 місяців. Дані з форм — до виконання запиту.
            Cookies — відповідно до{" "}
            <Link
              href="/cookies"
              className="text-white/70 underline underline-offset-2 transition hover:text-white"
            >
              Cookie Policy
            </Link>
            .
          </Section>

          <Section title="Зміни в політиці">
            Ми можемо оновлювати цю сторінку. Рекомендуємо час від часу перевіряти її.
          </Section>
        </div>

        {/* Footer links */}
        <div className="mt-16 flex items-center gap-6 text-[11px] text-white/30">
          <Link href="/cookies" className="transition hover:text-white/60">
            Cookie Policy →
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
