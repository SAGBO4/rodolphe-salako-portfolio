"use client";

import { usePortfolio } from "@/lib/portfolio-context";
import { useLanguage } from "@/lib/i18n/context";
import type { ReactNode } from "react";

type Entry = {
  school: string;
  degree: string;
  period: string;
  tag: string;
  brand: string;
};

const ENTRIES: Entry[] = [
  {
    school: "University Center of Adjarra, Porto-Novo, Benin",
    degree: "Bachelor’s Degree in English (English – French Translation)",
    period: "2025",
    tag: "DEGREE",
    brand: "#6366F1",
  },
  {
    school: "Professional Institute",
    degree: "Administrative Computing Diploma",
    period: "2024",
    tag: "TECH",
    brand: "#0EA5E9",
  },
  {
    school: "National High School Board",
    degree: "High School Diploma (Baccalaureate)",
    period: "2021 – 2022",
    tag: "BAC",
    brand: "#10B981",
  },
  {
    school: "International Industry Conferences",
    degree: "Speaker & Ambassador (SiGMA Africa, SBWA+ Dakar, iGaming AFRIKA)",
    period: "2026",
    tag: "SUMMIT",
    brand: "#F97316",
  },
];

export function Education(): ReactNode {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const entries = data.education && data.education.length > 0 ? data.education : ENTRIES;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        {t("about.education")}
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {entries.map((entry) => (
            <li
              key={`${entry.school}-${entry.period}`}
              className="bg-background border-foreground/5 flex items-center gap-3.5 rounded-3xl border p-3 sm:p-3.5"
            >
              <SchoolLogo entry={entry} />
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground text-[16px] font-semibold tracking-tight sm:text-[17px]">
                  {entry.school}
                </span>
                <span className="text-foreground/65 mt-0.5 text-[13.5px] tracking-tight sm:text-[14px]">
                  {entry.degree}
                  <span className="text-foreground/30 mx-2">•</span>
                  <span className="text-foreground/55 font-medium">{entry.period}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SchoolLogo({ entry }: { entry: Entry }): ReactNode {
  return (
    <span
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-white text-[12px] font-bold tracking-tight shadow-xs"
      aria-hidden="true"
      style={{ borderRadius: 14, backgroundColor: entry.brand }}
    >
      {entry.tag}
    </span>
  );
}
