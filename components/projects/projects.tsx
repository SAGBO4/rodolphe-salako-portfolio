"use client";

import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Calendar,
  Gamepad2,
  Globe,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState, type ComponentType, type ReactNode } from "react";
import { usePortfolio } from "@/lib/portfolio-context";
import { useLanguage } from "@/lib/i18n/context";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";
import { ProjectDetailModal } from "./project-detail-modal";
import type { ProjectItem } from "@/lib/portfolio-data";

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  company?: string;
  period?: string;
  title: string;
  description: string;
  meta: string;
};

const PROJECTS: Project[] = [
  {
    id: "block-scholars",
    icon: Globe,
    iconLabel: "WEB3 & DIGITAL EDUCATION",
    company: "Block-Scholars Africa",
    period: "2026 – Present",
    title: "Country Representative – Benin Republic",
    description:
      "Représentation de Block-Scholars Africa et développement de sa présence dans l'écosystème numérique béninois. Création de partenariats institutionnels avec universités et organisations, coordination des ambassadeurs et organisation d'ateliers sur les technologies émergentes.",
    meta: "Web3 • iGaming • Digital Education • Strategic Partnerships • Event Coordination",
  },
  {
    id: "onlyplay-cm-video",
    icon: Gamepad2,
    iconLabel: "GAMING & COMMUNITY",
    company: "ONLYPLAY",
    period: "Current",
    title: "Social Media & Community Manager & Video Editor",
    description:
      "Gestion et modération des communautés officielles Telegram, Discord et X. Production et montage de contenus vidéo courts pour les campagnes marketing. Participation aux sommets internationaux de l'industrie (SiGMA, iGaming Africa Summit, GTSA, AGE, SBWA+) et développement de partenariats stratégiques.",
    meta: "Telegram • Discord • X (Twitter) • Video Editing • Short-Form Video • Summit Networking",
  },
  {
    id: "tapbit-translator",
    icon: Globe,
    iconLabel: "CRYPTO & LOCALIZATION",
    company: "Tapbit Crypto Exchange",
    period: "Nov 2025 – Mar 2026",
    title: "English–French Translator",
    description:
      "Traduction et localisation de contenus crypto (articles, annonces officielles, interfaces utilisateur et messages de support) de l'anglais vers le français pour les utilisateurs francophones d'Afrique et à l'international, en assurant la rigueur terminologique Web3.",
    meta: "English–French Translation • Crypto Localization • Web3 • UI Texts • Support",
  },
  {
    id: "onlyplay-ambassador-lead",
    icon: Users,
    iconLabel: "TEAM LEADERSHIP",
    company: "ONLYPLAY",
    period: "July 2025 – January 2026",
    title: "Ambassador Team Lead",
    description:
      "Direction et coordination du programme international d'ambassadeurs. Recrutement, intégration et encadrement des ambassadeurs régionaux, suivi des performances, et organisation d'activités promotionnelles pour accroître la notoriété de la marque.",
    meta: "Ambassador Programs • Regional Ambassadors • Team Leadership • Community Growth",
  },
  {
    id: "cjc-race-marketing",
    icon: TrendingUp,
    iconLabel: "MARKETING & GROWTH",
    company: "CJC Race",
    period: "2024 – 2025",
    title: "Marketing Manager",
    description:
      "Élaboration et mise en œuvre des campagnes marketing digitales (réseaux sociaux, partenariats influenceurs, tournois et événements en ligne). Conception de supports visuels promotionnels et gestion du calendrier éditorial pour l'acquisition et la rétention des joueurs.",
    meta: "Marketing Campaigns • Influencer Partnerships • Tournaments • Visual Creatives • Player Acquisition",
  },
  {
    id: "1win-affiliate-lead",
    icon: Users,
    iconLabel: "AFFILIATE LEADERSHIP",
    company: "1win",
    period: "February 2024 – July 2024",
    title: "Affiliate Manager & Team Lead",
    description:
      "Supervision et coordination d'une équipe de gestionnaires d'affiliation. Recrutement de nouveaux affiliés et media buyers, négociation des deals et structures de commissions, suivi de la qualité du trafic, des conversions et de l'acquisition de joueurs.",
    meta: "Team Lead • Media Buyers • Commission Structures • Traffic Quality • Conversion Optimization",
  },
  {
    id: "topgoal-cm",
    icon: Gamepad2,
    iconLabel: "COMMUNITY MANAGEMENT",
    company: "TopGoal French",
    period: "Jan 2024 – Jul 2024",
    title: "Community Manager",
    description:
      "Gestion et modération de la communauté francophone officielle sur Telegram. Support quotidien des utilisateurs, diffusion des annonces et informations du jeu, animation d'activités communautaires et collecte des retours d'expérience.",
    meta: "Telegram Community • User Support • Game Updates • Community Insights",
  },
  {
    id: "1xbet-affiliate",
    icon: TrendingUp,
    iconLabel: "AFFILIATE MANAGEMENT",
    company: "1xbet",
    period: "2023 – 2024",
    title: "Affiliate Manager",
    description:
      "Développement et gestion des relations avec les partenaires affiliés et communautés en ligne. Recrutement et intégration de nouveaux affiliés, mise à disposition des outils de tracking et visuels promotionnels, et suivi des conversions.",
    meta: "Affiliate Onboarding • Tracking Links • Promotional Creatives • Revenue Optimization",
  },
  {
    id: "yescoin-cm",
    icon: Gamepad2,
    iconLabel: "COMMUNITY MANAGEMENT",
    company: "Yescoin - French",
    period: "2023 – 2024",
    title: "Community Manager",
    description:
      "Animation et modération de la communauté Telegram francophone. Réponses quotidiennes aux questions des utilisateurs, diffusion des annonces et mises à jour du projet, et organisation d'activités d'engagement.",
    meta: "Telegram Moderation • Daily Support • Announcements • Engagement Events",
  },
  {
    id: "chainmakers-marketing",
    icon: TrendingUp,
    iconLabel: "MARKETING MANAGEMENT",
    company: "Leschainmakers",
    period: "2022 – 2024",
    title: "Marketing Manager",
    description:
      "Développement et exécution de stratégies marketing pour soutenir la croissance de la marque et l'acquisition d'utilisateurs. Mise en place de partenariats stratégiques, gestion des budgets marketing et analyse des tendances de marché.",
    meta: "Marketing Strategies • User Acquisition • Marketing Budgets • Strategic Partnerships",
  },
  {
    id: "nda-smm",
    icon: Gamepad2,
    iconLabel: "SOCIAL MEDIA MANAGEMENT",
    company: "NDA",
    period: "2020 – 2023",
    title: "Social Media Manager",
    description:
      "Gestion de la présence de la marque sur les réseaux sociaux. Création et publication de contenus dédiés aux paris sportifs, au gaming et aux promotions, interaction quotidienne avec les joueurs et soutien à l'acquisition et la fidélisation.",
    meta: "Sports Betting • Content Publishing • Player Interactions • Acquisition & Retention",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projectsList: ProjectItem[] =
    data.projects && data.projects.length > 0
      ? data.projects
      : PROJECTS.map((p, idx) => ({
          id: p.id,
          title: p.title,
          company: p.company,
          period: p.period,
          category: p.iconLabel,
          description: p.description,
          meta: p.meta,
          link: "https://www.linkedin.com/in/rodolphe-salako-578885334",
          order: idx + 1,
        }));

  // On home page, display featured positions (top 6); on full page, display all 11
  const displayedProjects = viewMoreVisible
    ? projectsList.slice(0, 6)
    : projectsList;

  return (
    <section className="relative w-full overflow-visible">
      {/* Top Transition Element */}
      {viewMoreVisible ? (
        <div className="flex flex-col items-center justify-center pt-2 pb-6">
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-foreground/20 to-foreground/50" />
          <div className="my-2.5 flex items-center rounded-full border border-foreground/10 bg-background/80 px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/70 backdrop-blur-md shadow-xs">
            <span>{t("projects.badge")}</span>
          </div>
          <div className="h-8 w-[1px] bg-gradient-to-b from-foreground/50 to-foreground/20" />
        </div>
      ) : null}

      {withHeadline ? (
        <div className="mx-auto w-full max-w-275 px-4 sm:px-10">
          <FadeIn className="flex flex-col items-center gap-4 text-center pb-8 sm:pb-12">
            <h2 className="font-serif text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.5rem] font-medium leading-[1.08] tracking-tight text-foreground">
              {t("projects.title")}
            </h2>
            <p className="max-w-[42ch] text-[16px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[18px] md:text-[20px]">
              {t("projects.subtitle")}
            </p>
          </FadeIn>
        </div>
      ) : null}

      {/* Grid of Verified Professional Positions & Projects (Strictly 0 Images) */}
      <div className="mx-auto w-full max-w-275 px-4 sm:px-10">
        {!viewMoreVisible && (
          <div className="mb-8 flex items-center justify-between border-b border-foreground/8 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/75">
                {t("projects.allDetails")}
              </h3>
            </div>
            <span className="text-xs font-mono text-foreground/50">
              {projectsList.length} {t("projects.itemsCount")}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              className="scroll-mt-28"
            >
              <ProjectCard
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </div>

      {viewMoreVisible ? (
        <div className="mx-auto w-full max-w-275 px-4 sm:px-10">
          <div className="mt-8 flex justify-center sm:mt-12">
            <Link
              href="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 shadow-sm"
            >
              {t("projects.viewAll")}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Bottom Transition to Contact */}
          <div className="mt-12 flex flex-col items-center justify-center">
            <div className="h-10 w-[1px] bg-gradient-to-b from-foreground/30 to-foreground/15" />
            <div className="my-2.5 flex items-center gap-2 rounded-full border border-foreground/10 bg-background/80 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/70 backdrop-blur-md shadow-xs">
              <span>{t("contact.badge")}</span>
              <ArrowDown className="h-3 w-3 animate-bounce text-foreground/60" />
            </div>
            <div className="h-16 w-[1px] bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent" />
          </div>
        </div>
      ) : null}

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: ProjectItem;
  index: number;
  onClick?: () => void;
}): ReactNode {
  return (
    <FadeIn
      delay={Math.min(index * 0.05, 0.25)}
      className="h-full"
    >
      <article
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Détails du poste : ${project.title}`}
        className="project-card focus-ring flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-foreground/8 bg-background/70 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg backdrop-blur-xs"
      >
        <div className="flex flex-col gap-3.5">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {project.company && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/12 bg-foreground/4 px-2.5 py-0.5 text-xs font-semibold text-foreground">
                  <Briefcase className="h-3 w-3 text-foreground/60" />
                  {project.company}
                </span>
              )}
              {project.period && (
                <span className="inline-flex items-center gap-1 rounded-full border border-foreground/8 bg-background px-2 py-0.5 text-[11px] font-mono text-foreground/60">
                  <Calendar className="h-2.5 w-2.5 text-foreground/40" />
                  {project.period}
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-foreground/8 bg-background px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-foreground/50">
              <Sparkles className="h-2.5 w-2.5 text-amber-500" />
              {project.category}
            </span>
          </div>

          {/* Job Title */}
          <h3 className="font-serif text-[18px] sm:text-[20px] font-medium leading-snug tracking-tight text-foreground">
            {project.title}
          </h3>

          {/* Concise Description */}
          <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-foreground/70 tracking-tight line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Footer Meta Skills */}
        <div className="mt-4 pt-3.5 border-t border-foreground/6 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
            {project.meta.split("•").slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="rounded-md border border-foreground/8 bg-foreground/2 px-2 py-0.5 text-[10.5px] font-medium text-foreground/60"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/70 group-hover:text-foreground shrink-0">
            <span>Détails</span>
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </article>
    </FadeIn>
  );
}
