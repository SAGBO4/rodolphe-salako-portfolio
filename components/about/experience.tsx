"use client";

import { usePortfolio } from "@/lib/portfolio-context";
import { useLanguage } from "@/lib/i18n/context";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

type Entry = {
  company: string;
  role: string;
  period: string;
  description?: string;
  slug?: string;
  brand?: string;
};

const ENTRIES: Entry[] = [
  {
    company: "Block-Scholars Africa",
    role: "Country Representative – Benin Republic",
    period: "2026 – Present",
    brand: "#10B981",
    description:
      "Exploring new markets and developing presence across Benin. Building strategic partnerships with universities, student communities, and industry leaders; recruiting ambassador networks, and organizing digital technology and iGaming educational initiatives.",
  },
  {
    company: "1win",
    role: "Affiliate Manager & Team Lead",
    period: "Feb 2024 – Jul 2024",
    brand: "#1E40AF",
    description:
      "Managed and coordinated a high-performing affiliate management team. Supervised partner onboarding, negotiated bespoke commission structures, monitored traffic quality, and scaled revenues.",
  },
  {
    company: "Onlyplay",
    role: "Ambassador Team Lead",
    period: "Jul 2025 – Jan 2026",
    brand: "#FF7043",
    description:
      "Recruited, trained, and led an international team of brand ambassadors across emerging markets. Defined content guidelines, supervised milestone execution, and built enduring professional relationships with creators.",
  },
  {
    company: "CJC Race",
    role: "Marketing Manager",
    period: "2024 – 2025",
    brand: "#EF4444",
    description:
      "Executed integrated marketing campaigns (digital ads, influencer partnerships, online tournaments) that accelerated player acquisition, game visibility, and brand reach.",
  },
  {
    company: "Les chainmakers",
    role: "Marketing Manager",
    period: "2022 – 2024",
    brand: "#8B5CF6",
    description:
      "Formulated marketing strategies to accelerate brand growth, negotiated partnership activations, and managed competitor benchmarking and audience communications.",
  },
  {
    company: "1xBet",
    role: "Affiliate Manager",
    period: "2023 – 2024",
    brand: "#2563EB",
    description:
      "Cultivated strategic affiliate relationships, onboarded new traffic sources, and coordinated promotional materials to drive user acquisition.",
  },
  {
    company: "Tapbit Crypto Exchange",
    role: "English – French Translator & Community Support",
    period: "Nov 2025 – Mar 2026",
    brand: "#0284C7",
    description:
      "Localized cryptocurrency documentation, market updates, and UI interfaces from English to French. Collaborated with marketing and community teams to engage francophone traders.",
  },
  {
    company: "Onlyplay",
    role: "Social Media & Community Manager, Video Editor",
    period: "Current",
    brand: "#FF5722",
    description:
      "Managing and moderating official communities on Telegram, Discord, and X. Gathering player feedback to refine games, producing short-form video campaigns, hosting AMAs, and representing Onlyplay at international industry summits.",
  },
  {
    company: "TopGoal French",
    role: "Community Manager",
    period: "Jan 2024 – Jul 2024",
    brand: "#F59E0B",
    description:
      "Moderated the official French Telegram community, coordinated interactive events, and delivered community insights to product managers.",
  },
  {
    company: "Yescoin - French",
    role: "Community Manager",
    period: "2023 – 2024",
    brand: "#FBBF24",
    description:
      "Fostered a thriving Telegram community, provided real-time user assistance, organized promotional contests, and maintained vigilant anti-scam protection.",
  },
  {
    company: "NDA",
    role: "Social Media Manager",
    period: "2020 – 2023",
    brand: "#64748B",
    description:
      "Managed and developed NDA's social media presence in sports betting and gaming. Created engaging promotional content, handled player interactions, and supported user retention and community growth.",
  },
];

const COLLAPSED_HEIGHT = 440;

export function Experience(): ReactNode {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const entries = data.experiences && data.experiences.length > 0 ? data.experiences : ENTRIES;
  const [open, setOpen] = useState(true);
  const hiddenCount = Math.max(0, entries.length - 3);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        {t("about.experience")}
      </h3>
      <div
        className={`border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative overflow-hidden rounded-4xl border px-2 pt-2 sm:px-4 sm:pt-4 ${
          open ? "pb-2 sm:pb-4" : "pb-0"
        }`}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={{
            height: open ? "auto" : COLLAPSED_HEIGHT,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <ul className="flex flex-col gap-2">
            {entries.map((entry) => (
              <li
                key={`${entry.company}-${entry.period}`}
                className="bg-background border-foreground/5 flex items-start gap-3 sm:gap-4 rounded-3xl border p-3 sm:p-4"
              >
                <CompanyLogo entry={entry} />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-foreground text-[15px] font-semibold tracking-tight sm:text-[17px]">
                      {entry.company}
                    </span>
                    <span className="text-foreground/55 text-[12px] sm:text-[13px] tracking-tight">
                      {entry.period}
                    </span>
                  </div>
                  <span className="text-foreground/80 mt-0.5 text-[13px] sm:text-[14px] font-medium tracking-tight">
                    {entry.role}
                  </span>
                  {entry.description && (
                    <p className="text-foreground/60 mt-1.5 text-[12.5px] leading-relaxed tracking-tight sm:text-[13.5px]">
                      {entry.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <AnimatePresence>
          {!open && (
            <motion.div
              key="fade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{
                height: 100,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 80%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 80%)",
              }}
            />
          )}
        </AnimatePresence>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={`focus-ring text-foreground flex w-full cursor-pointer items-center justify-center gap-1.5 bg-transparent text-[15px] font-medium tracking-tight ${
              open
                ? "relative mt-4"
                : "absolute inset-x-0 bottom-0 z-10 py-3 sm:py-4"
            }`}
          >
            {open ? t("about.showLess") : `${t("about.showMore")} (${hiddenCount})`}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex"
            >
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </button>
        )}
      </div>
    </div>
  );
}

function CompanyLogo({ entry }: { entry: Entry }): ReactNode {
  const initials = entry.company.charAt(0);
  return (
    <span
      className="ring-foreground/8 inline-flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center bg-white ring-1 dark:ring-white/10"
      aria-hidden="true"
      style={{
        borderRadius: 14,
        ...(entry.slug ? {} : { backgroundColor: entry.brand }),
      }}
    >
      {entry.slug ? (
        <img
          src={`https://cdn.simpleicons.org/${entry.slug}`}
          alt=""
          width={24}
          height={24}
          className="h-5 w-5 sm:h-6 sm:w-6"
          draggable={false}
        />
      ) : (
        <span className="text-[16px] sm:text-[18px] font-semibold tracking-tight text-white">
          {initials}
        </span>
      )}
    </span>
  );
}
