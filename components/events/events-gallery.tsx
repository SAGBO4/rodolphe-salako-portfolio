"use client";

import { useState, useMemo, type ReactNode } from "react";
import Image from "next/image";
import { Award, Eye, MapPin, Calendar, Images } from "lucide-react";
import type { EventItem, EventPhoto } from "@/lib/portfolio-data";
import { useLanguage } from "@/lib/i18n/context";
import { EventModal } from "./event-modal";
import { FadeIn } from "@/components/ui/motion-primitives";

export type PurePhotoItem = {
  id: string;
  url: string;
  type?: "photo" | "speaker" | "post" | "banner" | undefined;
  eventCategory: string;
  eventTitle: string;
  isSpeaker?: boolean | undefined;
  city: string;
  country: string;
  date: string;
};

type EventsGalleryProps = {
  events: EventItem[];
};

export function EventsGallery({ events }: EventsGalleryProps): ReactNode {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalPhotos, setModalPhotos] = useState<PurePhotoItem[]>([]);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: t("events.filterAll") || "Tous" },
    { id: "sbwa-dakar", label: t("events.filterSbwa") || "SBWA+ Summit (Dakar)" },
    { id: "sigma-africa", label: t("events.filterSigma") || "SiGMA Africa (Cape Town)" },
    { id: "igaming-nairobi", label: t("events.filterNairobi") || "iGaming Afrika (Nairobi)" },
  ];

  // Group events according to selected category
  const displayedEvents = useMemo(() => {
    if (activeCategory === "all") return events;
    return events.filter((e) => e.eventCategory === activeCategory);
  }, [events, activeCategory]);

  // Total count of photos across all categories
  const totalPhotosCount = useMemo(() => {
    return events.reduce((sum, e) => sum + (e.photos?.length || 0), 0);
  }, [events]);

  const handleOpenPhoto = (photosList: PurePhotoItem[], index: number) => {
    setModalPhotos(photosList);
    setActiveModalIndex(index);
  };

  return (
    <div className="w-full">
      {/* Category Filter Pills (Identique au modèle works-card / classement strict par catégories) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count =
            cat.id === "all"
              ? totalPhotosCount
              : events.find((e) => e.eventCategory === cat.id)?.photos?.length || 0;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveModalIndex(null);
              }}
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

      {/* Sections d'événements classées par catégorie avec grille de photos pures (ZÉRO titre ni description sous les photos) */}
      <div className="space-y-12 sm:space-y-16">
        {displayedEvents.map((event, eventIdx) => {
          const eventPhotos: PurePhotoItem[] = (event.photos || []).map((p: EventPhoto, pIdx: number) => ({
            id: `${event.id}-photo-${pIdx}`,
            url: p.url,
            type: p.type || "photo",
            eventCategory: event.eventCategory,
            eventTitle: event.title,
            isSpeaker: p.type === "speaker" || (event.isSpeaker && p.type !== "post"),
            city: event.city,
            country: event.country,
            date: event.date,
          }));

          return (
            <FadeIn key={event.id} delay={0.08 * (eventIdx + 1)}>
              <section className="space-y-5">
                {/* En-tête de catégorie / sommet */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-foreground/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                        {event.title}
                      </h2>
                      {event.isSpeaker && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/35 text-[11px] font-semibold uppercase tracking-wider">
                          <Award className="h-3 w-3" />
                          <span>Speaker</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-foreground/50">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.city}, {event.country}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-mono text-foreground/60 self-start sm:self-auto">
                    <Images className="h-3.5 w-3.5" />
                    <span>{eventPhotos.length} photos</span>
                  </div>
                </div>

                {/* Grille de photos pures : AUCUN titre ni description sous l'image */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
                  {eventPhotos.map((photo, photoIndex) => (
                    <div
                      key={photo.id}
                      onClick={() => handleOpenPhoto(eventPhotos, photoIndex)}
                      className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black/60 border border-foreground/10 hover:border-foreground/35 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-xl cursor-pointer"
                    >
                      <Image
                        src={photo.url}
                        alt=""
                        fill
                        className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Badges discrets sur photo */}
                      {photo.type === "speaker" && (
                        <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/90 text-black text-[10px] font-bold uppercase tracking-wider shadow-sm pointer-events-none">
                          <Award className="h-2.5 w-2.5" />
                          <span>Speaker</span>
                        </span>
                      )}
                      {photo.type === "post" && (
                        <span className="absolute top-2 right-2 inline-flex items-center px-2 py-0.5 rounded-full bg-blue-500/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm pointer-events-none">
                          Post
                        </span>
                      )}

                      {/* Icône de zoom au centre au survol */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                          <Eye className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          );
        })}
      </div>

      {/* Lightbox Modal plein écran épuré (pas de description textuelle encombrante) */}
      {activeModalIndex !== null && modalPhotos.length > 0 && (
        <EventModal
          photos={modalPhotos}
          initialIndex={activeModalIndex}
          onClose={() => setActiveModalIndex(null)}
        />
      )}
    </div>
  );
}
