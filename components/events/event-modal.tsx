"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Award, Image as ImageIcon } from "lucide-react";
import type { EventItem } from "@/lib/portfolio-data";
import { useLanguage } from "@/lib/i18n/context";

type EventModalProps = {
  event: EventItem | null;
  onClose: () => void;
};

export function EventModal({ event, onClose }: EventModalProps): ReactNode {
  const { t } = useLanguage();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Reset photo index when event changes
  useEffect(() => {
    setActivePhotoIndex(0);
  }, [event]);

  // Handle keyboard navigation (Escape, Left, Right)
  useEffect(() => {
    if (!event) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : event.photos.length - 1));
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev < event.photos.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [event, onClose]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!event) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [event]);

  if (!event) return null;

  const currentPhoto = event.photos[activePhotoIndex] || event.photos[0];
  const totalPhotos = event.photos.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : totalPhotos - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev < totalPhotos - 1 ? prev + 1 : 0));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0f1115] border border-foreground/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-3.5 sm:px-6 bg-foreground/2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                event.isSpeaker
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  : "bg-foreground/10 text-foreground/80 border border-foreground/15"
              }`}
            >
              {event.isSpeaker && <Award className="h-3.5 w-3.5 text-amber-400" />}
              {event.badge}
            </span>
            <span className="hidden sm:inline-flex text-xs text-foreground/50 font-mono">
              {event.city}, {event.country}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-colors cursor-pointer"
            aria-label={t("events.closeModal") || "Fermer"}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1 flex flex-col p-4 sm:p-6 gap-5">
          {/* Main Large Photo Viewer */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/60 border border-foreground/10 flex items-center justify-center">
            {currentPhoto && (
              <Image
                src={currentPhoto.url}
                alt={currentPhoto.caption || event.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            )}

            {/* Navigation Arrows */}
            {totalPhotos > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer shadow-lg"
                  aria-label="Photo précédente"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer shadow-lg"
                  aria-label="Photo suivante"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Photo Counter Badge */}
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/75 border border-white/15 text-xs font-mono font-medium text-white/90 backdrop-blur-sm flex items-center gap-1.5 shadow-md">
              <ImageIcon className="h-3.5 w-3.5" />
              <span>
                {activePhotoIndex + 1} / {totalPhotos}
              </span>
            </div>
          </div>

          {/* Current Photo Caption */}
          {currentPhoto?.caption && (
            <p className="text-xs sm:text-sm text-foreground/75 italic bg-foreground/3 border border-foreground/8 rounded-xl px-4 py-2.5">
              &ldquo;{currentPhoto.caption}&rdquo;
            </p>
          )}

          {/* Thumbnail Strip */}
          {totalPhotos > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
              {event.photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative shrink-0 h-16 w-20 sm:h-18 sm:w-24 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                    activePhotoIndex === idx
                      ? "border-amber-400 ring-2 ring-amber-400/30 scale-102"
                      : "border-foreground/15 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Voir photo ${idx + 1}`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.caption || `Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                  {photo.type === "speaker" && (
                    <span className="absolute top-1 right-1 text-[10px] bg-amber-500 text-black px-1 rounded-xs font-bold leading-tight">
                      MIC
                    </span>
                  )}
                  {photo.type === "post" && (
                    <span className="absolute top-1 right-1 text-[10px] bg-blue-500 text-white px-1 rounded-xs font-bold leading-tight">
                      POST
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Event Details Section */}
          <div className="space-y-4 pt-2 border-t border-foreground/10">
            <div>
              <h2 id="event-modal-title" className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {event.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-foreground/60 mt-2">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-foreground/50" />
                  <span>{event.date}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-foreground/50" />
                  <span>{event.location}</span>
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
              {event.summary}
            </p>

            <div className="rounded-2xl border border-foreground/10 bg-foreground/2.5 p-4 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-foreground/70">
              <div>
                <strong className="text-foreground">Rôle officiel :</strong> {event.role}
              </div>
              <div className="text-xs font-mono text-foreground/50">
                {event.city} • {event.country}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-foreground/10 px-5 py-3 sm:px-6 bg-foreground/2 flex items-center justify-between">
          <span className="text-xs text-foreground/50 font-mono">
            Navigation : Touches ← / → • Échap pour fermer
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          >
            {t("events.closeModal") || "Fermer l'aperçu"}
          </button>
        </div>
      </div>
    </div>
  );
}
