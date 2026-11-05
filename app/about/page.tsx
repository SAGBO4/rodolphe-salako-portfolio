"use client";

import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { usePortfolio } from "@/lib/portfolio-context";
import { useLanguage } from "@/lib/i18n/context";
import type { ReactNode } from "react";

export default function AboutPage(): ReactNode {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const p = data.profile;

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      {/* Intro / Bio Hero Section */}
      <section className="mx-auto w-full max-w-275 px-4 pt-28 pb-10 sm:px-10 sm:pt-48 sm:pb-16">
        <FadeIn delay={0.1}>
          <div className="rounded-3xl sm:rounded-4xl border border-foreground/5 bg-foreground/1.5 p-4 sm:p-8 md:p-12 lg:p-14 dark:bg-foreground/3 shadow-xs">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
              {/* Left Column: Greeting, Role, Stats & Quick Actions */}
              <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-5">
                <div className="inline-flex items-center self-start rounded-full border border-foreground/8 bg-background/80 px-3.5 py-1 text-[13px] font-medium tracking-tight text-foreground/80 backdrop-blur-xs">
                  {p.role}
                </div>

                <h1 className="font-serif text-[1.5rem] sm:text-[2.15rem] lg:text-[2.35rem] font-medium leading-[1.2] tracking-tight text-foreground">
                  {t("about.greeting")} <span className="border-b-2 border-foreground/30 pb-0.5">{p.name}</span>.
                </h1>

                <p className="text-[15px] sm:text-[17px] leading-[1.6] tracking-tight text-foreground/75 sm:text-[18px]">
                  {p.aboutTagline}
                </p>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                  {p.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-foreground/8 bg-background/70 p-3 sm:p-4 transition-colors flex flex-col justify-between"
                    >
                      <span
                        className={`block font-semibold tracking-tight text-foreground ${
                          stat.value.length > 6
                            ? "text-[1.15rem] sm:text-[1.45rem] leading-tight"
                            : "text-[1.65rem] sm:text-[2.25rem] leading-none"
                        }`}
                      >
                        {stat.value}
                      </span>
                      <span className="text-[10px] sm:text-[12px] font-medium text-foreground/60 uppercase tracking-wider mt-1.5 block">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
                  <a
                    href={p.cvUrl || "/SALAKO_CV.pdf"}
                    download
                    className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-[14px] font-medium tracking-tight text-background transition-opacity hover:opacity-90 text-center"
                  >
                    {t("about.downloadCv")}
                  </a>
                  <a
                    href={p.telegram || "https://t.me/ZekiZeki40"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-foreground/10 bg-background px-4 py-2.5 text-[14px] font-medium tracking-tight text-foreground transition-colors hover:bg-foreground/5 text-center"
                  >
                    {t("about.contactTelegram")}
                  </a>
                </div>
              </div>

              {/* Right Column: In-depth Story & Mission */}
              <div className="flex flex-col gap-6 lg:col-span-7 lg:border-l lg:border-foreground/8 lg:pl-10">
                <div className="space-y-4 sm:space-y-5 text-[15px] sm:text-[16px] leading-[1.75] tracking-tight text-foreground/80 md:text-[17.5px]">
                  {p.aboutParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="rounded-2xl border border-foreground/8 bg-background/80 p-4 sm:p-6 backdrop-blur-xs">
                  <span className="block text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-foreground/50 mb-1.5">
                    {t("about.coreMission")}
                  </span>
                  <p className="font-serif text-[16px] sm:text-[18px] md:text-[20px] font-medium leading-snug tracking-tight text-foreground">
                    &ldquo;{p.mission}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Main Experience & Expertise Grid */}
      <section className="mx-auto w-full max-w-275 px-4 pb-16 sm:px-10 sm:pb-28">
        <FadeIn delay={0.2}>
          <div className="flex flex-col gap-10 sm:gap-14">
            {/* Top Row: Experience (Left) & Skills + Education (Right) */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10 items-start">
              {/* Left Column: Experience (Open by default) */}
              <div className="lg:col-span-7">
                <Experience />
              </div>

              {/* Right Column: Skills & Education */}
              <div className="flex flex-col gap-10 lg:col-span-5">
                <Skills />
                <Education />
              </div>
            </div>

            {/* Bottom Row: Stack taking full width */}
            <div className="w-full">
              <Stack />
            </div>
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
