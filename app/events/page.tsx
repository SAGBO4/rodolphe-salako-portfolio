"use client";

import type { ReactNode } from "react";
import { ContactCard } from "@/components/contact/contact-card";
import { EventsGallery } from "@/components/events/events-gallery";
import { FadeIn } from "@/components/ui/motion-primitives";
import { useLanguage } from "@/lib/i18n/context";
import { usePortfolio } from "@/lib/portfolio-context";

export default function EventsPage(): ReactNode {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const events = data.events || [];

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      {/* Header Section */}
      <section className="mx-auto w-full max-w-275 px-4 pt-28 pb-10 sm:px-10 sm:pt-48 sm:pb-16 text-center">
        <FadeIn className="flex flex-col items-center gap-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/3 px-3.5 py-1 text-xs font-mono font-medium tracking-wider uppercase text-foreground/75 backdrop-blur-xs">
            {t("events.badge") || "Sommets & Événements"}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]">
            {t("events.pageTitle") || "Sommets & Événements Internationaux"}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl">
            {t("events.pageSubtitle") ||
              "Interventions officielles en tant que Speaker, partenariats stratégiques B2B et représentation de marque aux sommets SiGMA Africa, SBWA+ Dakar et iGaming Afrika Nairobi."}
          </p>
        </FadeIn>
      </section>

      {/* Events Gallery Grid with Category Filter Tabs */}
      <section className="mx-auto w-full max-w-275 px-4 pb-20 sm:px-10 sm:pb-28">
        <EventsGallery events={events} />
      </section>

      {/* Contact Section */}
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
