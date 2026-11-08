"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Award, Image as ImageIcon } from "lucide-react";
import type { EventItem } from "@/lib/portfolio-data";
import type { PurePhotoItem } from "./events-gallery";
import { useLanguage } from "@/lib/i18n/context";

type NormalizedPhoto = {
  url: string;
  type?: string | undefined;
  eventTitle?: string | undefined;
  badge?: string | undefined;
  isSpeaker?: boolean | undefined;
  city?: string | undefined;
  country?: string | undefined;
  date?: string | undefined;
};

type EventModalProps = {
  photos?: PurePhotoItem[] | undefined;
  initialIndex?: number | undefined;
  event?: EventItem | null | undefined;
  onClose: () => void;
};

export function EventModal({ photos, initialIndex = 0, event, onClose }: EventModalProps): ReactNode {
  const { t, language } = useLanguage();

  const photoList: NormalizedPhoto[] = photos
    ? photos.map((p) => ({
        url: p.url,
        type: p.type,
        eventTitle: p.eventTitle,
        badge:
          p.type === "speaker"
            ? "Speaker"
            : p.type === "post"
            ? "Capture Post"
            : p.eventCategory === "sigma-africa"
            ? "SiGMA Africa"
            : p.eventCategory === "sbwa-dakar"
            ? "SBWA+ Summit"
            : "iGaming Afrika",
        isSpeaker: p.isSpeaker,
        city: p.city,
        country: p.country,
        date: p.date,
      }))
    : event
    ? event.photos.map((p) => ({
        url: p.url,
        type: p.type,
        eventTitle: event.title,
        badge: event.badge,
        isSpeaker: p.type === "speaker" || event.isSpeaker,
        city: event.city,
        country: event.country,
        date: event.date,
      }))
    : [];

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  // Handle keyboard navigation (Escape, Left, Right)
  useEffect(() => {
    if (photoList.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : photoList.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev < photoList.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photoList.length, onClose]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (photoList.length === 0) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [photoList.length]);

  if (photoList.length === 0) return null;

  const current: NormalizedPhoto = photoList[activeIndex] ?? photoList[0]!;
  const total = photoList.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-modal-header"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/92 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl bg-[#0b0d10] border border-foreground/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar : Catégorie du sommet + Bouton Fermer (Aucune description superflue) */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-3 sm:px-6 bg-foreground/2">
          <div className="flex items-center gap-2.5 min-w-0 pr-4">
            <span
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                current.isSpeaker
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  : current.type === "post"
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                  : "bg-foreground/10 text-foreground/80 border border-foreground/15"
              }`}
            >
              {current.isSpeaker && <Award className="h-3 w-3 text-amber-400" />}
              {current.badge}
            </span>
            <span
              id="photo-modal-header"
              className="font-serif text-sm sm:text-base font-semibold text-foreground truncate"
            >
              {current.eventTitle}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-colors cursor-pointer shrink-0"
            aria-label={t("events.closeModal") || "Fermer"}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Visionneuse Photo Plein Écran */}
        <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[70vh] rounded-2xl overflow-hidden bg-black/70 border border-foreground/10 flex items-center justify-center">
            {current.url && (
              <Image
                src={current.url}
                alt=""
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            )}

            {/* Navigation Arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer shadow-lg"
                  aria-label={language === "fr" ? "Photo précédente" : "Previous photo"}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer shadow-lg"
                  aria-label={language === "fr" ? "Photo suivante" : "Next photo"}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Photo Counter Badge */}
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/75 border border-white/15 text-xs font-mono font-medium text-white/90 backdrop-blur-sm flex items-center gap-1.5 shadow-md">
              <ImageIcon className="h-3.5 w-3.5" />
              <span>
                {activeIndex + 1} / {total}
              </span>
            </div>

            {/* Localisation */}
            {current.city && (
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/75 border border-white/15 text-xs font-medium text-white/90 backdrop-blur-sm shadow-md">
                <span>{current.city}, {current.country}</span>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Strip (Navigation par vignettes sans texte) */}
        {total > 1 && (
          <div className="border-t border-foreground/10 px-4 py-2.5 bg-foreground/2 flex items-center gap-2 overflow-x-auto">
            {photoList.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative shrink-0 h-14 w-18 sm:h-16 sm:w-20 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                  activeIndex === idx
                    ? "border-amber-400 ring-2 ring-amber-400/30 scale-102 opacity-100"
                    : "border-foreground/15 opacity-50 hover:opacity-100"
                }`}
                aria-label={`Miniature ${idx + 1}`}
              >
                <Image
                  src={photo.url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
