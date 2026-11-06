"use client";

import { usePortfolio } from "@/lib/portfolio-context";
import { useLanguage } from "@/lib/i18n/context";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Send } from "lucide-react";
import { useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactButton(): ReactNode {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const email = data.profile?.email || "rodolphesalako8@gmail.com";
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={`mailto:${email}`}
      layout
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`${t("hero.contact")} (${email})`}
      transition={{ layout: { duration: 0.55, ease: EASE } }}
      style={{ borderRadius: 12 }}
      className="focus-ring relative inline-flex h-11 cursor-pointer items-center justify-center bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 shadow-sm"
    >
      <motion.span
        layout="position"
        className="relative inline-flex items-center"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {hovered ? (
            <motion.span
              key="email"
              layout="position"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">{email}</span>
            </motion.span>
          ) : (
            <motion.span
              key="contact"
              layout="position"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t("hero.contact")}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.a>
  );
}
