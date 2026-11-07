"use client";

import { useState, useMemo, type ReactNode } from "react";
import Image from "next/image";
import { MapPin, Award, Eye } from "lucide-react";
import type { EventItem, EventPhoto } from "@/lib/portfolio-data";
import { useLanguage } from "@/lib/i18n/context";
import { EventModal } from "./event-modal";
import { FadeIn } from "@/components/ui/motion-primitives";

export type FlatPhotoItem = {
  id: string;
  url: string;
  caption: string;
  type?: "photo" | "speaker" | "post" | "banner" | undefined;
  eventTitle: string;
  eventCategory: string;
  eventBadge: string;
  isSpeaker?: boolean | undefined;
  date: string;
  location: string;
  city: string;
  country: string;
  photoIndexInEvent: number;
};

type EventsGalleryProps = {
  events: EventItem[];
};

export function EventsGallery({ events }: EventsGalleryProps): ReactNode {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Flatten all photos across events so every photo is represented as a works-card item
  const allPhotos: FlatPhotoItem[] = useMemo(() => {
    return events.flatMap((event) =>
      (event.photos || []).map((photo: EventPhoto, photoIdx: number) => ({
        id: `${event.id}-photo-${photoIdx}`,
        url: photo.url,
        caption: photo.caption || event.title,
        type: photo.type || "photo",
        eventTitle: event.title,
        eventCategory: event.eventCategory,
        eventBadge: event.badge,
        isSpeaker: photo.type === "speaker" || (event.isSpeaker && photo.type !== "post"),
        date: event.date,
        location: event.location,
        city: event.city,
        country: event.country,
        photoIndexInEvent: photoIdx,
      }))
    );
  }, [events]);

  const categories = [
    { id: "all", label: t("events.filterAll") || "Tous" },
    { id: "sigma-africa", label: t("events.filterSigma") || "SiGMA Africa (Cape Town)" },
    { id: "sbwa-dakar", label: t("events.filterSbwa") || "SBWA+ Summit (Dakar)" },
    { id: "igaming-nairobi", label: t("events.filterNairobi") || "iGaming Afrika (Nairobi)" },
  ];

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return allPhotos;
    return allPhotos.filter((p) => p.eventCategory === activeCategory);
  }, [allPhotos, activeCategory]);

  return (
    <div className="w-full">
      {/* Category Filter Pills (Identique au filtre works-card de fidelepicture.com) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count =
            cat.id === "all"
              ? allPhotos.length
              : allPhotos.filter((p) => p.eventCategory === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedPhotoIndex(null);
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

      {/* Grid of Photo Cards (Style works-card de fidelepicture.com / pas de paragraphe de description) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredPhotos.map((photo, index) => (
          <FadeIn key={photo.id} delay={0.03 * (index % 6 + 1)}>
            <div
              onClick={() => setSelectedPhotoIndex(index)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-foreground/2 hover:bg-foreground/4 border border-foreground/10 hover:border-foreground/25 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl flex flex-col h-full"
            >
              {/* Image Container with hover zoom & eye overlay */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Top Corner Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md border ${
                      photo.type === "speaker"
                        ? "bg-amber-500/25 text-amber-300 border-amber-500/40 shadow-xs"
                        : photo.type === "post"
                        ? "bg-blue-500/25 text-blue-300 border-blue-500/40 shadow-xs"
                        : "bg-black/60 text-white/90 border-white/15"
                    }`}
                  >
                    {photo.type === "speaker" && <Award className="h-3 w-3 text-amber-400" />}
                    {photo.type === "speaker"
                      ? "Speaker"
                      : photo.type === "post"
                      ? "Capture Post"
                      : photo.eventCategory === "sigma-africa"
                      ? "SiGMA"
                      : photo.eventCategory === "sbwa-dakar"
                      ? "SBWA+"
                      : "iGaming"}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
                    <MapPin className="h-2.5 w-2.5 text-white/60" />
                    <span>{photo.city}</span>
                  </span>
                </div>

                {/* Hover Center Icon (Identique au hover eye de works-card) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="h-11 w-11 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Description Block (Strictement Titre + Catégorie/Lieu — AUCUNE description textuelle) */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                <h3 className="font-serif text-sm sm:text-base font-semibold tracking-tight text-foreground group-hover:text-foreground/90 transition-colors line-clamp-2">
                  {photo.caption}
                </h3>
                <div className="flex items-center justify-between text-xs text-foreground/50 pt-1 border-t border-foreground/5">
                  <span className="truncate max-w-[200px]">{photo.eventTitle}</span>
                  <span className="font-mono text-[11px] shrink-0 text-foreground/45">{photo.date}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Lightbox Modal sur la photo sélectionnée (sans texte de description) */}
      {selectedPhotoIndex !== null && (
        <EventModal
          photos={filteredPhotos}
          initialIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
        />
      )}
    </div>
  );
}
