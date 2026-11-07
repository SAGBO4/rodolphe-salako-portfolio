"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Calendar, MapPin, Award, Eye, Images, ArrowRight } from "lucide-react";
import type { EventItem } from "@/lib/portfolio-data";
import { useLanguage } from "@/lib/i18n/context";
import { EventModal } from "./event-modal";
import { FadeIn } from "@/components/ui/motion-primitives";

type EventsGalleryProps = {
  events: EventItem[];
};

export function EventsGallery({ events }: EventsGalleryProps): ReactNode {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const categories = [
    { id: "all", label: t("events.filterAll") || "Tous les événements" },
    { id: "sbwa-dakar", label: t("events.filterSbwa") || "SBWA+ Summit (Dakar)" },
    { id: "sigma-africa", label: t("events.filterSigma") || "SiGMA Africa (Cape Town)" },
    { id: "igaming-nairobi", label: t("events.filterNairobi") || "iGaming Afrika (Nairobi)" },
  ];

  const filteredEvents =
    activeCategory === "all"
      ? events
      : events.filter((e) => e.eventCategory === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filter Pills (Inspired by Fidele's PortfolioGallery) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count =
            cat.id === "all"
              ? events.length
              : events.filter((e) => e.eventCategory === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`focus-ring inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-foreground text-background shadow-md shadow-foreground/10 scale-102"
                  : "bg-foreground/5 hover:bg-foreground/10 text-foreground/75 hover:text-foreground border border-foreground/10"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? "bg-background/20 text-background"
                    : "bg-foreground/10 text-foreground/60"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredEvents.map((event, index) => (
          <FadeIn key={event.id} delay={0.08 * (index + 1)}>
            <div
              onClick={() => setSelectedEvent(event)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-foreground/2 hover:bg-foreground/4 border border-foreground/10 hover:border-foreground/25 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl flex flex-col h-full"
            >
              {/* Event Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <Image
                  src={event.coverImage}
                  alt={event.coverImageAlt || event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md border ${
                      event.isSpeaker
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm"
                        : "bg-black/60 text-white/90 border-white/15"
                    }`}
                  >
                    {event.isSpeaker && <Award className="h-3 w-3 text-amber-400" />}
                    {event.badge}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80">
                    <Images className="h-3 w-3 text-white/70" />
                    <span>{event.photos?.length || 0}</span>
                  </span>
                </div>

                {/* Hover Quick Action Eye Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-3">
                  {/* Date & Location */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-foreground/60">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-foreground/50" />
                      <span>{event.date}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-foreground/50" />
                      <span>{event.city}, {event.country}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-foreground group-hover:text-foreground/90 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed line-clamp-3">
                    {event.summary}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-foreground/8 flex items-center justify-between text-xs">
                  <span className="text-foreground/60 font-mono truncate max-w-[200px]">
                    {event.role}
                  </span>
                  <span className="inline-flex items-center gap-1 text-foreground font-semibold group-hover:translate-x-1 transition-transform">
                    <span>{t("events.openGallery") || "Explorer"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Lightbox Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
