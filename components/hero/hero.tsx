"use client";

import type { ReactNode } from "react";
import { usePortfolio } from "@/lib/portfolio-context";
import { useLanguage } from "@/lib/i18n/context";
import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import ProfileCard from "@/components/ui/ProfileCard";

const PORTRAIT_SRC = "/rodolphe.webp";
const PORTRAIT_HOVER_SRC = "/rodolphe_hover.webp";

export function Hero(): ReactNode {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const p = data.profile;

  const handleContactClick = () => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `mailto:${p.email || "rodolphesalako8@gmail.com"}`;
    }
  };

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-4 pt-28 pb-16 sm:px-10 sm:pt-48 md:pt-56 sm:pb-28 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-tight tracking-tight font-medium text-foreground">
              {p.heroIntro}
            </p>

            <h1 className="text-[clamp(1.4rem,5.5vw,2.75rem)] font-medium leading-[1.14] tracking-tight text-foreground">
              <span className="block sm:whitespace-nowrap break-words">{p.heroTitle1}</span>
              <span className="block sm:whitespace-nowrap break-words">{p.heroTitle2}</span>
            </h1>

            <p className="max-w-[36ch] text-[16px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[19px] md:text-[21px]">
              {p.heroDescription}
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-center md:justify-end">
            <ProfileCard
              avatarUrl={PORTRAIT_SRC}
              miniAvatarUrl={PORTRAIT_HOVER_SRC}
              name={p.name}
              title={p.role || "Business Development & Sales Professional"}
              handle="ZekiZeki40"
              status={t("hero.status") || "Available for Partnerships"}
              statusColor="#22c55e"
              contactText={t("hero.contact") || "Contact"}
              theme="dark"
              radius={20}
              holo={0.85}
              glare={0.55}
              tiltStrength={14}
              parallax={10}
              enableTilt={true}
              intro={true}
              showUserInfo={true}
              onContactClick={handleContactClick}
              className="w-full max-w-[310px] sm:max-w-[340px] md:max-w-[360px]"
            />
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
