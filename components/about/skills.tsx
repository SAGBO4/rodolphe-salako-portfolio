"use client";

import { usePortfolio } from "@/lib/portfolio-context";
import { useLanguage } from "@/lib/i18n/context";
import type { ReactNode } from "react";

const DEFAULT_SKILLS = [
  "Business Development & B2B Sales",
  "Strategic Partnerships & Dealmaking",
  "Exploring New Markets & Regional Expansion",
  "Affiliate Management & Team Leadership",
  "Event Coordination & International Summits",
  "Official Conference Speaker & Ambassador",
  "Marketing Management & Growth Strategy",
  "English–French Translation & Localization",
  "High-Value Operator Relations (iGaming & Web3)",
  "Social Media Strategy & Content Creation",
  "Community Management (Discord, Telegram, X)",
  "Short-form Video Editing (CapCut, Premiere)",
];

export function Skills(): ReactNode {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const skills = data.skills && data.skills.length > 0 ? data.skills : DEFAULT_SKILLS;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        {t("about.whatIDo")}
      </h3>
      <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-4 dark:bg-foreground/5">
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-foreground/8 bg-background px-4 py-2 text-[14px] tracking-tight text-foreground/85 sm:text-[15px]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
