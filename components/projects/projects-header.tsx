"use client";

import { useLanguage } from "@/lib/i18n/context";
import { FadeIn } from "@/components/ui/motion-primitives";
import type { ReactNode } from "react";

export function ProjectsHeader(): ReactNode {
  const { t } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-275 px-4 pt-28 pb-10 sm:px-10 sm:pt-48 sm:pb-16">
      <FadeIn className="flex flex-col items-center gap-4 sm:gap-5 text-center">
        <h1 className="font-serif text-[clamp(2rem,7vw,3.75rem)] font-medium leading-[1.08] tracking-tight text-foreground">
          {t("projects.pageTitle")}
        </h1>
        <p className="max-w-[36ch] text-[16px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[20px] md:text-[22px]">
          {t("projects.pageSubtitle")}
        </p>
      </FadeIn>
    </section>
  );
}
