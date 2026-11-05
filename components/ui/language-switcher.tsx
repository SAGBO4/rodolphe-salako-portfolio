"use client";

import { useLanguage } from "@/lib/i18n/context";
import type { ReactNode } from "react";

export function LanguageSwitcher(): ReactNode {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection / Choix de la langue"
      className="inline-flex items-center rounded-full bg-foreground/4 p-0.5 border border-foreground/8 transition-colors"
    >
      <button
        type="button"
        onClick={() => setLanguage("fr")}
        aria-pressed={language === "fr"}
        aria-label="Passer le site en français"
        className={`focus-ring relative flex items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
          language === "fr"
            ? "bg-foreground text-background shadow-xs font-bold"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        FR
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        aria-label="Switch site to English"
        className={`focus-ring relative flex items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
          language === "en"
            ? "bg-foreground text-background shadow-xs font-bold"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
}
