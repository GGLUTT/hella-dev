"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  File01Icon,
  CreditCardIcon,
  CustomerSupportIcon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons";
import { useLang } from "@/context/LangContext";

// Facts taken from the FAQ answers — short, scannable reasons to trust.
const ITEMS = [
  { icon: File01Icon, ua: ["Договір", "фіксуємо обсяг, ціну й терміни"], en: ["Contract", "scope, price and deadline fixed"] },
  { icon: CreditCardIcon, ua: ["Оплата 50/50", "решта — після здачі проєкту"], en: ["50/50 payment", "the rest after delivery"] },
  { icon: CustomerSupportIcon, ua: ["14 днів підтримки", "безкоштовно після запуску"], en: ["14 days of support", "free after launch"] },
  { icon: SourceCodeIcon, ua: ["Код і доступи — ваші", "без прив'язки до конструкторів"], en: ["You own code & access", "no site-builder lock-in"] },
];

export default function TrustStrip() {
  const { lang } = useLang();

  return (
    <section aria-label={lang === "ua" ? "Гарантії" : "Guarantees"} className="relative border-y border-white/10 bg-black">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => {
          const [title, sub] = lang === "ua" ? item.ua : item.en;
          return (
            <motion.li
              key={item.en[0]}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center gap-3 px-5 py-5 sm:px-8 sm:py-6 ${i % 2 ? "border-l border-white/10" : ""} ${
                i > 1 ? "border-t border-white/10 lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <HugeiconsIcon icon={item.icon} size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-white sm:text-sm">{title}</span>
                <span className="block text-[11px] leading-snug text-white/45 sm:text-xs">{sub}</span>
              </span>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
