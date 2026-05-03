"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLang } from "@/context/LangContext";
import {
  ArrowRight02Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Note01Icon,
  BubbleChatIcon,
  Call02Icon,
  MagicWand01Icon,
} from "@hugeicons/core-free-icons";
import Reveal from "./Reveal";

type MeetingType = "consult" | "call";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface FormErrors {
  name?: string;
  email?: string;
}

export default function Contact() {
  const router = useRouter();
  const { t } = useLang();
  const [type, setType] = useState<MeetingType>("consult");
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sendError, setSendError] = useState(false);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!name.trim()) e.name = t("Введіть ваше ім\u02bcя", "Enter your name");
    if (!email.trim()) e.email = t("Введіть email", "Enter email");
    else if (!EMAIL_RE.test(email)) e.email = t("Невірний формат email", "Invalid email format");
    return e;
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSendError(false);
    setTouched({ name: true, email: true });
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, type }),
      });
      if (!res.ok) throw new Error("send failed");
      const params = new URLSearchParams({ type, name });
      router.push(`/success?${params.toString()}`);
    } catch {
      setSendError(true);
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-5 py-24 sm:px-6 sm:py-32 md:py-40"
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/8 blur-[180px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/6 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header — centered */}
        <div className="text-center">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/55 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {t("Доступний для нових проєктів", "Available for new projects")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              {t("Готові", "Ready to")}{" "}
              <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                {t("обговорити", "discuss")}
              </span>
              ?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-base text-white/55">
              {t("Заповни коротку форму — відповім протягом доби з планом і оцінкою.", "Fill out the short form — I'll reply within 24h with a plan and estimate.")}
            </p>
          </Reveal>
        </div>

        {/* Two-column: process steps (left) + form (right) */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 md:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — process timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-4 lg:col-span-5"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">
              {t("Як це працює", "How it works")}
            </div>

            <ProcessStep
              num="01"
              icon={<HugeiconsIcon icon={Note01Icon} size={16} />}
              title={t("Заявка", "Submit")}
              hint={t("Заповнюєш форму — потрібно ~30 секунд", "Fill the form — takes ~30 seconds")}
            />
            <ProcessStep
              num="02"
              icon={<HugeiconsIcon icon={BubbleChatIcon} size={16} />}
              title={t("Відповідь до 24 год", "Reply within 24h")}
              hint={t("Розглядаю і пишу пропозицію особисто", "I review and write a personal proposal")}
            />
            <ProcessStep
              num="03"
              icon={<HugeiconsIcon icon={Calendar03Icon} size={16} />}
              title={t("Зустріч 30 хв", "30-min call")}
              hint={t("Узгоджуємо обсяг, терміни і стек", "We align scope, timeline and stack")}
            />
            <ProcessStep
              num="04"
              icon={<HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />}
              title={t("План + фікс-оцінка", "Plan + fixed quote")}
              hint={t("Письмово, з відповідальністю — без розмитих 'десь $X'", "Written, accountable — no vague 'around $X'")}
              last
            />

            {/* Mini value-props */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/55">
              <Pill icon={<HugeiconsIcon icon={Clock01Icon} size={12} />}>{t("до 24 год", "< 24h")}</Pill>
              <Pill icon={<HugeiconsIcon icon={MagicWand01Icon} size={12} />}>{t("безкоштовно", "free")}</Pill>
              <Pill icon={<HugeiconsIcon icon={Call02Icon} size={12} />}>{t("без зайвих дзвінків", "no spam calls")}</Pill>
            </div>
          </motion.div>

          {/* RIGHT — form card */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 text-left backdrop-blur-md sm:p-6 md:p-8 lg:col-span-7"
          >
          {/* Animated gradient border */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-300/15 via-transparent to-sky-300/10 opacity-60"
          />

          {/* Type segmented control */}
          <div className="relative">
            <div className="relative grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
              {/* Sliding indicator */}
              <motion.div
                aria-hidden
                animate={{ x: type === "consult" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white"
              />
              <button
                type="button"
                onClick={() => setType("consult")}
                className={`relative z-10 flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-medium transition-colors ${
                  type === "consult" ? "text-black" : "text-white/70"
                }`}
              >
                <HugeiconsIcon icon={BubbleChatIcon} size={13} />
                {t("Консультація", "Consultation")}
              </button>
              <button
                type="button"
                onClick={() => setType("call")}
                className={`relative z-10 flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-medium transition-colors ${
                  type === "call" ? "text-black" : "text-white/70"
                }`}
              >
                <HugeiconsIcon icon={Call02Icon} size={13} />
                {t("Дзвінок", "Call")}
              </button>
            </div>
          </div>

          {/* Name + Email */}
          <div className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <Input
                value={name}
                onChange={(v) => { setName(v); if (touched.name) setErrors((prev) => ({ ...prev, name: v.trim() ? undefined : t("Введіть ваше ім\u02bcя", "Enter your name") })); }}
                onBlur={() => handleBlur("name")}
                placeholder={t("Імʼя", "Name")}
                hasError={!!(touched.name && errors.name)}
              />
              {touched.name && errors.name && (
                <span className="pl-1 text-[11px] text-red-400">{errors.name}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                value={email}
                onChange={(v) => { setEmail(v); if (touched.email) setErrors((prev) => ({ ...prev, email: !v.trim() ? t("Введіть email", "Enter email") : !EMAIL_RE.test(v) ? t("Невірний формат email", "Invalid email") : undefined })); }}
                onBlur={() => handleBlur("email")}
                placeholder="Email"
                type="email"
                hasError={!!(touched.email && errors.email)}
              />
              {touched.email && errors.email && (
                <span className="pl-1 text-[11px] text-red-400">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="relative mt-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder={t("Коротко про проєкт (необовʼязково)", "Briefly about the project (optional)")}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-emerald-300/40 focus:bg-white/[0.04]"
            />
          </div>

          {/* Submit */}
          {sendError && (
            <p className="mt-3 text-center text-[12px] text-red-400">
              {t("Помилка відправки. Спробуйте ще раз.", "Send failed. Please try again.")}
            </p>
          )}
          <motion.button
            type="submit"
            disabled={submitting}
            whileTap={{ scale: 0.98 }}
            className="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/95 disabled:opacity-60"
          >
            <span className="relative z-10">
              {submitting ? t("Надсилаю...", "Sending...") : t("Надіслати заявку", "Send request")}
            </span>
            <span
              className={`relative z-10 transition ${
                submitting ? "" : "group-hover:translate-x-1"
              }`}
            >
              <HugeiconsIcon icon={ArrowRight02Icon} size={14} />
            </span>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </motion.button>
          </motion.form>
        </div>

        {/* Tiny direct contact line */}
        <Reveal delay={0.25}>
          <p className="mt-8 text-center text-xs text-white/40">
            {t("або напряму:", "or directly:")} {" "}
            <a
              href="mailto:hello@yevhenii.dev"
              className="text-white/70 underline-offset-4 transition hover:text-white hover:underline"
            >
              hello@yevhenii.dev
            </a>{" "}
            ·{" "}
            <a
              href="https://t.me/yevhenii_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 underline-offset-4 transition hover:text-white hover:underline"
            >
              @yevhenii_dev
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =================== sub-components =================== */

function ProcessStep({
  num,
  icon,
  title,
  hint,
  last,
}: {
  num: string;
  icon: React.ReactNode;
  title: string;
  hint: string;
  last?: boolean;
}) {
  return (
    <motion.div
      variants={{
        hidden: { x: -16, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="group relative flex items-start gap-4"
    >
      {/* Connector line */}
      {!last && (
        <span
          aria-hidden
          className="absolute left-[19px] top-10 h-[calc(100%-8px)] w-px bg-gradient-to-b from-white/15 to-white/5"
        />
      )}
      {/* Number/icon bubble */}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black text-emerald-300 transition group-hover:border-emerald-300/40">
        {icon}
      </span>
      <div className="min-w-0 flex-1 pb-2">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
          {num}
        </div>
        <div className="mt-1 text-sm font-medium text-white">{title}</div>
        <div className="mt-0.5 text-xs leading-relaxed text-white/50">
          {hint}
        </div>
      </div>
    </motion.div>
  );
}

function Pill({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-md">
      <span className="text-emerald-300">{icon}</span>
      {children}
    </span>
  );
}

function Input({
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  hasError = false,
}: {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder: string;
  type?: string;
  hasError?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`w-full rounded-2xl border bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:bg-white/[0.04] ${
        hasError
          ? "border-red-400/50 focus:border-red-400/70"
          : "border-white/10 focus:border-emerald-300/40"
      }`}
    />
  );
}
