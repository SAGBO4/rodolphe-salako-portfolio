"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowRight, Calendar, MapPin, Award, Images } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-context";
import { useLanguage } from "@/lib/i18n/context";
import { FadeIn } from "@/components/ui/motion-primitives";

export function EventsSpotlight(): ReactNode {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const events = data.events || [];

  if (events.length === 0) return null;

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 border-t border-foreground/8">
      <div className="mx-auto w-full max-w-275 px-4 sm:px-10">
        {/* Section Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono font-medium tracking-wider uppercase text-foreground/60">
              {t("events.badge") || "Sommets & Événements"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {t("events.spotlightTitle") || "Sommets Internationaux & Interventions"}
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
              {t("events.spotlightSubtitle") ||
                "Présence officielle et panels de conférence sur les plus grands sommets de l'industrie iGaming en Afrique."}
            </p>
          </div>

          <NextLink
            href="/events"
            className="focus-ring self-start md:self-auto inline-flex items-center gap-2 rounded-2xl bg-foreground px-5 py-2.5 text-xs sm:text-sm font-semibold text-background hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
          >
            <span>{t("events.viewAll") || "Explorer la Galerie des Sommets"}</span>
            <ArrowRight className="h-4 w-4" />
          </NextLink>
        </FadeIn>

        {/* 3 Summit Cards Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {events.slice(0, 3).map((event, index) => (
            <FadeIn key={event.id} delay={0.08 * (index + 1)}>
              <NextLink
                href="/events"
                className="group block rounded-3xl overflow-hidden bg-foreground/2 hover:bg-foreground/4 border border-foreground/10 hover:border-foreground/25 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg h-full flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <Image
                    src={event.coverImage}
                    alt={event.coverImageAlt || event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md border ${
                        event.isSpeaker
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          : "bg-black/60 text-white/90 border-white/15"
                      }`}
                    >
                      {event.isSpeaker && <Award className="h-3 w-3 text-amber-400" />}
                      {event.badge}
                    </span>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
                      <Images className="h-3 w-3 text-white/70" />
                      <span>{event.photos?.length || 0}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-foreground/50 mb-2">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.city}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-foreground/90 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-foreground/8 flex items-center justify-between text-xs text-foreground/60">
                    <span className="truncate max-w-[180px]">{event.role}</span>
                    <span className="font-semibold text-foreground flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Voir</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </NextLink>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
