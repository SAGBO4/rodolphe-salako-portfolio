"use client";

import { useLanguage } from "@/lib/i18n/context";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Briefcase, Calendar, Sparkles, X } from "lucide-react";
import { useEffect, useCallback, type ReactNode } from "react";
import type { ProjectItem } from "@/lib/portfolio-data";

export type ProjectDetailModalProps = {
  project: ProjectItem | null;
  onClose: () => void;
};

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps): ReactNode {
  const { language } = useLanguage();

  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  const labels = {
    categoryFallback: language === "fr" ? "EXPÉRIENCE & PROJET" : "EXPERIENCE & PROJECT",
    metaTitle: language === "fr" ? "Compétences & Domaines clés" : "Key Skills & Domains",
    overviewTitle: language === "fr" ? "Description du poste" : "Role Description",
    openLink: language === "fr" ? "Voir le profil & réseau" : "View Profile & Network",
    close: language === "fr" ? "Fermer" : "Close",
  };

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="relative border-b border-foreground/8 bg-foreground/3 p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {project.company && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground">
                      <Briefcase className="h-3.5 w-3.5 text-foreground/70" />
                      {project.company}
                    </span>
                  )}
                  {project.period && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background px-3 py-1 text-xs font-mono text-foreground/70">
                      <Calendar className="h-3 w-3 text-foreground/50" />
                      {project.period}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-background px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-foreground/60">
                    <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                    {project.category || labels.categoryFallback}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={labels.close}
                  className="focus-ring flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-background text-foreground transition-transform hover:scale-105 hover:bg-foreground/5 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <h3
                id="modal-project-title"
                className="mt-4 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-foreground leading-snug"
              >
                {project.title}
              </h3>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
              {project.meta && (
                <div className="rounded-2xl border border-foreground/8 bg-foreground/2 p-4 sm:p-5">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-2.5">
                    {labels.metaTitle}
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.meta.split("•").map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-foreground/10 bg-background px-3 py-1 text-xs font-medium text-foreground/80 shadow-2xs"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-2">
                  {labels.overviewTitle}
                </span>
                <p className="text-[15px] sm:text-base leading-relaxed text-foreground/80 tracking-tight">
                  {project.description}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-foreground/8">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 cursor-pointer text-center"
                  >
                    <span>{labels.openLink}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : <div />}

                <button
                  type="button"
                  onClick={onClose}
                  className="focus-ring rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/10 cursor-pointer text-center"
                >
                  {labels.close}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
