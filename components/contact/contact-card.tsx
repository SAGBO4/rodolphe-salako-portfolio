"use client";

import { usePortfolio } from "@/lib/portfolio-context";
import { useLanguage } from "@/lib/i18n/context";
import { Mail, Phone, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactCardCtas } from "./contact-card-ctas";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "../shaders/shader-flow";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function ContactCard(): ReactNode {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const p = data.profile;

  return (
    <section className="mx-auto my-8 sm:my-20 w-full max-w-275 px-4 sm:px-10">
      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-3xl sm:rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.4rem] sm:rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{
                WebkitMaskImage: CARD_FADE_MASK,
                maskImage: CARD_FADE_MASK,
              }}
            >
              <ShaderFlow scale={3} brightness={3}/>
            </div>

            <div className="relative grid gap-6 p-4 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-4 sm:gap-5">
                <h2 className="font-serif text-[1.85rem] sm:text-[2.75rem] lg:text-[3.25rem] font-medium leading-[1.08] tracking-tight text-foreground">
                  {t("contact.title")}
                </h2>
                <p className="max-w-[34ch] text-[16px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[19px] md:text-[20px] mb-2 sm:mb-4">
                  {t("contact.text")}
                </p>
                <p className="text-sm text-foreground/60 mb-2">
                  {p.availability}
                </p>
                <ContactCardCtas />
              </div>

              <div className="border-foreground/8 flex flex-col items-center justify-center gap-5 sm:gap-6 rounded-[1.1rem] border bg-background p-4 sm:p-8">
                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 opacity-85">
                  <SocialIcon
                    href={`mailto:${p.email}`}
                    label="Email"
                    lucideIcon={Mail}
                  />
                  <SocialIcon
                    href={`tel:${p.phoneRaw || "+2290140797262"}`}
                    label={`Phone / WhatsApp: ${p.phone || "+229 01 40 79 72 62"}`}
                    lucideIcon={Phone}
                  />
                  <SocialIcon
                    href={p.telegram}
                    label="Telegram"
                    lucideIcon={Send}
                  />
                  <SocialIcon
                    href={p.twitter}
                    label="X (Twitter)"
                    imageSrc="/x.svg"
                  />
                  <SocialIcon
                    href={p.linkedin || "https://www.linkedin.com/in/rodolphe-salako-578885334"}
                    label="LinkedIn"
                    imageSrc="/linkedin.svg"
                  />
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-[13px] font-medium tracking-tight text-foreground/80">
                    &copy; {p.name}
                  </p>
                  <p className="text-[12px] tracking-tight text-foreground/50">
                    {p.role} | iGaming, Web3 &amp; FinTech
                  </p>
                  {p.phone && (
                    <p className="text-[12px] font-mono tracking-tight text-foreground/60 mt-0.5">
                      {p.location ? `${p.location} • ` : ""}{p.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  lucideIcon: LucideIcon,
  imageSrc,
}: {
  href: string;
  label: string;
  lucideIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  imageSrc?: string;
}): ReactNode {
  const isExternal = href.startsWith("http");
  const props = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link
      href={href}
      aria-label={label}
      className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
      {...props}
    >
      {LucideIcon ? (
        <LucideIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={14}
          height={14}
          aria-hidden="true"
          className="max-h-[14px] max-w-[14px] object-contain dark:invert"
        />
      ) : null}
    </Link>
  );
}
