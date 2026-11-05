"use client";

import {
  ArrowDown,
  ArrowRight,
  Award,
  Gamepad2,
  Globe,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState, useEffect, type ComponentType, type ReactNode } from "react";
import { usePortfolio } from "@/lib/portfolio-context";
import { useLanguage } from "@/lib/i18n/context";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { FadeIn } from "@/components/ui/motion-primitives";
import { ProjectDetailModal } from "./project-detail-modal";
import type { ProjectItem } from "@/lib/portfolio-data";
import type { AccordionGalleryItem } from "@/components/ui/AccordionGallery";
import type { DriftWallItem } from "@/components/ui/DriftWall";

const DriftWall = dynamic(() => import("@/components/ui/DriftWall"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] w-full items-center justify-center rounded-4xl border border-foreground/8 bg-foreground/2 text-sm text-foreground/50">
      Chargement du mur de projets 3D...
    </div>
  ),
});

const AccordionGallery = dynamic(() => import("@/components/ui/AccordionGallery"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[440px] w-full items-center justify-center rounded-2xl border border-foreground/8 bg-foreground/2 text-sm text-foreground/50">
      Chargement de la galerie interactive...
    </div>
  ),
});

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
};

const PROJECTS: Project[] = [
  {
    id: "strategic-partnerships",
    icon: TrendingUp,
    iconLabel: "BUSINESS DEVELOPMENT",
    title: "Business Development & Strategic Partnerships — iGaming & Web3",
    description:
      "Identifying new business opportunities and structuring strategic B2B partnerships with game studios, betting operators, and crypto platforms across African and international markets.",
    meta: "B2B Dealmaking • Strategic Partnerships • Operator Relations • BetConstruct AI",
    imageRatio: 1024 / 680,
    image: "/uploads/rodolphe_betconstruct.jpg",
    imageAlt: "Rodolphe Salako B2B Partnerships with BetConstruct and Game Operators",
  },
  {
    id: "affiliate-leadership",
    icon: Users,
    iconLabel: "AFFILIATE LEADERSHIP",
    title: "Affiliate Management & Team Leadership — 1win & 1xBet",
    description:
      "Leading and coordinating teams of affiliate managers, recruiting top media buyers, structuring high-converting commission models, and optimizing player acquisition funnels.",
    meta: "Team Lead • Media Buyers • Deal Negotiation • Revenue Growth",
    imageRatio: 1024 / 680,
    image: "/uploads/rodolphe_1xbet_summit.jpg",
    imageAlt: "Rodolphe Salako Affiliate Team Leadership 1win and 1xBet",
  },
  {
    id: "summits-speaking",
    icon: Award,
    iconLabel: "EVENT COORDINATION",
    title: "Event Coordination & Speaker — SiGMA Africa & SBWA+ Dakar",
    description:
      "Representing gaming brands at premier international conferences. Official Speaker at SBWA+ & GEFA in Dakar, networking with C-level executives, and building high-trust industry alliances.",
    meta: "Official Speaker • SiGMA Africa Cape Town • SBWA+ Summit Dakar",
    imageRatio: 1024 / 680,
    image: "/uploads/rodolphe_sigma_africa.jpg",
    imageAlt: "Rodolphe Salako Speaker at SiGMA Africa and SBWA+ Summit",
  },
  {
    id: "market-expansion-benin",
    icon: Globe,
    iconLabel: "MARKET EXPANSION",
    title: "Exploring New Markets — Block-Scholars Africa Country Representative",
    description:
      "Spearheading regional expansion within Benin. Building institutional partnerships with universities, student communities, and organizations to scale Web3 and digital technology adoption.",
    meta: "Country Representative • Benin Republic • Campus Ambassador Network",
    imageRatio: 1024 / 680,
    image: "/uploads/rodolphe_meetup_speaker.jpg",
    imageAlt: "Rodolphe Salako Block-Scholars Africa Benin Representative",
  },
  {
    id: "marketing-management",
    icon: TrendingUp,
    iconLabel: "MARKETING MANAGEMENT",
    title: "Marketing Management & Growth Strategy — CJC Race & Chainmakers",
    description:
      "Developing integrated multi-channel marketing campaigns, managing marketing budgets, negotiating influencer collaborations, and delivering initiatives that drive user acquisition and engagement.",
    meta: "Growth Strategy • Digital Campaigns • Influencer Partnerships • Tournaments",
    imageRatio: 1024 / 680,
    image: "/uploads/rodolphe_summit_table.jpg",
    imageAlt: "Rodolphe Salako Marketing Management CJC Race and Chainmakers",
  },
  {
    id: "social-media-community",
    icon: Gamepad2,
    iconLabel: "COMMUNITY & SOCIAL MEDIA",
    title: "Social Media, Community Management & Video Production — Onlyplay Club",
    description:
      "Managing multi-channel community engagement across Telegram, Discord, and X. Hosting high-engagement AMAs, editing promotional video content, and turning player communities into sustainable growth engines.",
    meta: "Community Operations • Interactive AMAs • Video Editing • Telegram & Discord",
    imageRatio: 1024 / 680,
    image: "/uploads/rodolphe_onlyplay_ama.jpg",
    imageAlt: "Onlyplay Club Community AMAs and Player Operations",
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

  const getSafeImage = (img: string | undefined, defaultImg: string): string => {
    if (!img || img.trim() === "" || img.startsWith("blob:")) {
      return defaultImg;
    }
    return img;
  };

  const projectsList: ProjectItem[] =
    data.projects && data.projects.length > 0
      ? data.projects
      : PROJECTS.map((p, idx) => ({
          id: p.id,
          title: p.title,
          category: p.iconLabel,
          description: p.description,
          meta: p.meta,
          image: p.image,
          imageAlt: p.imageAlt,
          link: "https://www.linkedin.com/in/rodolphe-salako-578885334",
          order: idx + 1,
        }));

  const additionalSummitItems: ProjectItem[] = [
    {
      id: "sbwa-certificate",
      title: "SBWA+ & GEFA Official Speaker Honors — Dakar",
      category: "Speaker Distinction",
      meta: "Conference Speaker • Executive Certificate • Gaming Event Francophone Africa",
      description:
        "Official Speaker distinction at Sports Betting West Africa+ (SBWA+) & GEFA Summit in Dakar, Senegal. Honored for speaking contributions on African gaming and digital tech expansion.",
      image: "/uploads/rodolphe_sbwa_certificate.jpg",
      imageAlt: "SBWA+ Dakar Speaker Certificate",
      link: "https://www.linkedin.com/in/rodolphe-salako-578885334",
      order: 7,
    },
    {
      id: "speaker-badge",
      title: "SiGMA Africa & Global Summits Speaker Credentials",
      category: "Summit Credentials",
      meta: "SiGMA Africa Cape Town • Speaker Badge • VIP Delegate Access",
      description:
        "Official conference credentials and VIP speaker access across premier international iGaming and Web3 exhibitions.",
      image: "/uploads/rodolphe_speaker_badge.jpg",
      imageAlt: "SiGMA Africa Speaker Badge",
      link: "https://www.linkedin.com/in/rodolphe-salako-578885334",
      order: 8,
    },
  ];

  const allItemsPool: ProjectItem[] = [...projectsList, ...additionalSummitItems];

  const driftWallItems: DriftWallItem[] = Array.from({ length: 15 }, (_, i) => {
    const item = allItemsPool[i % allItemsPool.length] ?? allItemsPool[0]!;
    const fallback =
      PROJECTS[i % PROJECTS.length]?.image ?? "/uploads/rodolphe_betconstruct.jpg";
    return {
      image: getSafeImage(item.image, fallback),
      title: item.title,
      projectRef: item,
    };
  });

  const accordionItems: AccordionGalleryItem[] = allItemsPool.slice(0, 6).map((item) => {
    const fallback =
      PROJECTS.find((orig) => orig.id === item.id)?.image ??
      "/uploads/rodolphe_betconstruct.jpg";
    return {
      image: getSafeImage(item.image, fallback),
      label: item.title,
      alt: item.imageAlt ?? item.title,
      category: item.category,
      projectRef: item,
    };
  });

  const dynamicProjectsList: Project[] =
    data.projects && data.projects.length > 0
      ? data.projects.map((p, idx) => {
          const defaultProj = PROJECTS.find((orig) => orig.id === p.id);
          const icon = defaultProj?.icon || TrendingUp;
          const fallback = defaultProj?.image || PROJECTS[idx % PROJECTS.length]?.image || "";
          return {
            id: p.id || `proj-${idx}`,
            icon,
            iconLabel: p.category ? p.category.toUpperCase() : "WEB3 PROJECT",
            title: p.title,
            description: p.description,
            meta: p.meta,
            imageRatio: 1024 / 680,
            image: getSafeImage(p.image, fallback),
            imageAlt: p.imageAlt || p.title,
          };
        })
      : PROJECTS;

  return (
    <section className="relative w-full overflow-visible">
      {/* Element de transition en haut (Progression depuis Hero) */}
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
        <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
          <FadeIn className="flex flex-col items-center gap-4 text-center pb-4 sm:pb-6">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              {t("projects.title")}
            </h2>
            <p className="max-w-[38ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              {t("projects.subtitle")}
            </p>
            {viewMoreVisible ? (
              <div className="mt-2 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground/50">
                <Sparkles className="h-3.5 w-3.5 text-foreground/60" />
                <span>{t("projects.dragHint")}</span>
              </div>
            ) : null}
          </FadeIn>
        </div>
      ) : null}

      {viewMoreVisible ? (
        /* HOME PAGE: DriftWall 3D Perspective Wall */
        <div className="relative w-full overflow-hidden">
          {/* Masques de dégradé progressifs haut et bas pour un fondu fluide */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background via-background/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background via-background/60 to-transparent"
          />

          <div className="relative h-[620px] sm:h-[680px] md:h-[720px] w-full">
            <DriftWall
              items={driftWallItems}
              columns={5}
              tileWidth={220}
              tileHeight={145}
              gap={18}
              tilt={16}
              turn={-14}
              perspective={1200}
              depth={120}
              speed={38}
              direction="up"
              variance={0.45}
              parallax={0.6}
              lift={64}
              fade={0.6}
              dim={0.65}
              overlayColor="#060010"
              onItemClick={(item) => {
                if (item.projectRef) {
                  setSelectedProject(item.projectRef as ProjectItem);
                }
              }}
            />
          </div>
        </div>
      ) : (
        /* PROJECTS PAGE (/projects): AccordionGallery en haut + détails en bas */
        <div className="flex flex-col gap-12 sm:gap-16">
          <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
            <div className="relative w-full overflow-hidden rounded-2xl border border-foreground/8 bg-background/60 p-2 sm:p-3 shadow-2xl backdrop-blur-md">
              <AccordionGallery
                items={accordionItems}
                defaultIndex={0}
                expandRatio={0.48}
                trigger="hover"
                height={440}
                gap={12}
                radius={14}
                tilt={6}
                actionText={t("projects.viewDetails")}
                onItemClick={(item) => {
                  if (item.projectRef) {
                    setSelectedProject(item.projectRef as ProjectItem);
                  }
                }}
              />
            </div>
          </div>

          <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
            <div className="mb-8 flex items-center justify-between border-b border-foreground/8 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/75">
                  {t("projects.allDetails")}
                </h3>
              </div>
              <span className="text-xs font-mono text-foreground/50">
                {dynamicProjectsList.length} {t("projects.itemsCount")}
              </span>
            </div>

            <div className="columns-1 gap-6 md:columns-2 md:gap-7">
              {dynamicProjectsList.map((project, index) => (
                <div
                  key={project.id}
                  id={`project-${project.id}`}
                  className="break-inside-avoid scroll-mt-28"
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onClick={() => {
                      const full = projectsList.find((p) => p.id === project.id);
                      if (full) setSelectedProject(full);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMoreVisible ? (
        <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
          <div className="mt-6 flex justify-center sm:mt-10">
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

          {/* Element de transition en bas (Progression vers Contact) */}
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
  project: Project;
  index: number;
  onClick?: () => void;
}): ReactNode {
  const Icon = project.icon;
  const fallback =
    PROJECTS.find((p) => p.id === project.id)?.image ||
    "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1024&auto=format&fit=crop";

  const initialSrc =
    project.image && !project.image.startsWith("blob:")
      ? project.image
      : fallback;

  const [imgSrc, setImgSrc] = useState(initialSrc);

  useEffect(() => {
    const valid =
      project.image && !project.image.startsWith("blob:")
        ? project.image
        : fallback;
    setImgSrc(valid);
  }, [project.image, fallback]);

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
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
        aria-label={`View details for ${project.title}`}
        className="project-card focus-ring flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5 transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.iconLabel}
          </span>
        </header>

        <div
          className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
          style={{ aspectRatio: project.imageRatio }}
        >
          <div className="project-card__image-inner">
            <Image
              src={imgSrc}
              alt={project.imageAlt}
              fill
              unoptimized={imgSrc.startsWith("data:") || imgSrc.startsWith("blob:")}
              onError={() => {
                if (imgSrc !== fallback) {
                  setImgSrc(fallback);
                }
              }}
              sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
              className="object-cover object-top"
              priority={index < 2}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
          {project.meta}
        </p>
      </article>
    </FadeIn>
  );
}
