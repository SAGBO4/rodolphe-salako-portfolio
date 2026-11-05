export type StatItem = {
  label: string;
  value: string;
};

export type ProfileData = {
  name: string;
  role: string;
  greeting: string;
  heroIntro: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDescription: string;
  aboutTagline: string;
  aboutParagraphs: string[];
  mission: string;
  stats: StatItem[];
  email: string;
  telegram: string;
  telegramHandle: string;
  twitter: string;
  twitterHandle: string;
  linkedin?: string;
  availability: string;
  cvUrl: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  meta: string;
  image: string;
  imageAlt: string;
  link: string;
  order: number;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  brand: string;
  description: string;
  slug?: string;
  order: number;
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  period: string;
  tag: string;
  brand: string;
  order: number;
};

export type StackChipItem = {
  id: string;
  label: string;
  slug: string;
  bg: string;
  fg: string;
  iconUrl?: string;
  order: number;
};

export type PortfolioData = {
  profile: ProfileData;
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  stack: StackChipItem[];
};

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Rodolphe Salako",
    role: "Business Development & Sales Professional",
    greeting: "Hello! I'm Rodolphe Salako.",
    heroIntro: "Hey 👋, I'm Rodolphe Salako",
    heroTitle1: "Business Development &",
    heroTitle2: "Strategic Partnerships",
    heroDescription:
      "Business Development and Sales professional with experience in the iGaming and Web3 industries. Focused on identifying business opportunities, developing strategic partnerships, building strong professional relationships, and exploring new markets.",
    aboutTagline:
      "Connecting People. Building Partnerships. Driving Growth. Dedicated to identifying business opportunities, developing strategic B2B partnerships, leading affiliate networks, exploring new markets, and driving digital expansion.",
    aboutParagraphs: [
      "I'm Rodolphe Salako, a Business Development and Sales professional with experience in the iGaming and Web3 industries.",
      "My work focuses on identifying business opportunities, developing strategic partnerships, building strong professional relationships, and exploring new markets. I also have experience in affiliate management, team leadership, event coordination, social media, and community management.",
      "I'm passionate about connecting businesses, building valuable partnerships, and contributing to growth across the digital industry. Connecting People. Building Partnerships. Driving Growth.",
    ],
    mission: "Connecting People. Building Partnerships. Driving Growth.",
    stats: [
      { label: "Years Experience", value: "4+" },
      { label: "Strategic Partners", value: "20+" },
      { label: "Remote & Bilingual", value: "100%" },
      { label: "Global Markets", value: "Africa & Global" },
    ],
    email: "rodolphesalako8@gmail.com",
    telegram: "https://t.me/ZekiZeki40",
    telegramHandle: "@ZekiZeki40",
    twitter: "https://x.com/ZekiZeki40",
    twitterHandle: "@ZekiZeki40",
    linkedin: "https://www.linkedin.com/in/rodolphe-salako-578885334",
    availability: "Available for remote work worldwide & international events",
    cvUrl: "/SALAKO_CV.pdf",
  },
  projects: [
    {
      id: "strategic-partnerships",
      order: 1,
      title: "Business Development & Strategic Partnerships — iGaming & Web3",
      category: "Business Development",
      meta: "B2B Dealmaking • Strategic Partnerships • Operator Relations • BetConstruct AI",
      image: "/uploads/rodolphe_betconstruct.jpg",
      imageAlt: "Rodolphe Salako B2B Partnerships with BetConstruct and Game Operators",
      description:
        "Identifying new business opportunities and structuring strategic B2B partnerships with game studios, betting operators, and crypto platforms across African and international markets.",
      link: "https://www.linkedin.com/in/rodolphe-salako-578885334",
    },
    {
      id: "affiliate-leadership",
      order: 2,
      title: "Affiliate Management & Team Leadership — 1win & 1xBet",
      category: "Affiliate Leadership",
      meta: "Team Lead • Media Buyers • Deal Negotiation • Revenue Growth",
      image: "/uploads/rodolphe_1xbet_summit.jpg",
      imageAlt: "Rodolphe Salako Affiliate Team Leadership 1win and 1xBet",
      description:
        "Leading and coordinating teams of affiliate managers, recruiting top media buyers, structuring high-converting commission models, and optimizing player acquisition funnels.",
      link: "https://www.linkedin.com/in/rodolphe-salako-578885334",
    },
    {
      id: "summits-speaking",
      order: 3,
      title: "Event Coordination & Speaker — SiGMA Africa & SBWA+ Dakar",
      category: "Event Coordination",
      meta: "Official Speaker • SiGMA Africa Cape Town • SBWA+ Summit Dakar",
      image: "/uploads/rodolphe_sigma_africa.jpg",
      imageAlt: "Rodolphe Salako Speaker at SiGMA Africa and SBWA+ Summit",
      description:
        "Representing gaming brands at premier international conferences. Official Speaker at SBWA+ & GEFA in Dakar, networking with C-level executives, and building high-trust industry alliances.",
      link: "https://www.linkedin.com/in/rodolphe-salako-578885334",
    },
    {
      id: "market-expansion-benin",
      order: 4,
      title: "Exploring New Markets — Block-Scholars Africa Country Representative",
      category: "Market Expansion",
      meta: "Country Representative • Benin Republic • Tech Education • Partnerships",
      image: "/uploads/rodolphe_meetup_speaker.jpg",
      imageAlt: "Rodolphe Salako Block-Scholars Africa Benin Representative",
      description:
        "Spearheading regional expansion within Benin. Building institutional partnerships with universities, student communities, and organizations to scale Web3 and digital technology adoption.",
      link: "https://www.linkedin.com/in/rodolphe-salako-578885334",
    },
    {
      id: "marketing-management",
      order: 5,
      title: "Marketing Management & Growth Strategy — CJC Race & Chainmakers",
      category: "Marketing Management",
      meta: "Growth Strategy • Digital Campaigns • Influencer Partnerships • Tournaments",
      image: "/uploads/rodolphe_summit_table.jpg",
      imageAlt: "Rodolphe Salako Marketing Management CJC Race and Chainmakers",
      description:
        "Developing integrated multi-channel marketing campaigns, managing marketing budgets, negotiating influencer collaborations, and delivering initiatives that drive user acquisition and engagement.",
      link: "https://www.linkedin.com/in/rodolphe-salako-578885334",
    },
    {
      id: "social-media-community",
      order: 6,
      title: "Social Media, Community Management & Video Production — Onlyplay Club",
      category: "Social Media & Community",
      meta: "Community Operations • Interactive AMAs • Video Editing • Telegram & Discord",
      image: "/uploads/rodolphe_onlyplay_ama.jpg",
      imageAlt: "Onlyplay Club Community AMAs and Player Operations",
      description:
        "Managing multi-channel community engagement across Telegram, Discord, and X. Hosting high-engagement AMAs, editing promotional video content, and turning player communities into sustainable growth engines.",
      link: "https://x.com/ZekiZeki40",
    },
  ],
  experiences: [
    {
      id: "block-scholars",
      order: 1,
      company: "Block-Scholars Africa",
      role: "Country Representative – Benin Republic",
      period: "2026 – Present",
      brand: "#10B981",
      description:
        "Exploring new markets and developing presence across Benin. Building strategic partnerships with universities, student communities, and industry leaders; recruiting ambassador networks, and organizing digital technology and iGaming educational initiatives.",
    },
    {
      id: "1win",
      order: 2,
      company: "1win",
      role: "Affiliate Manager & Team Lead",
      period: "Feb 2024 – Jul 2024",
      brand: "#1E40AF",
      description:
        "Managed and coordinated a high-performing affiliate management team. Supervised partner onboarding, negotiated bespoke commission structures, monitored traffic quality, and scaled revenues.",
    },
    {
      id: "onlyplay-ambassador",
      order: 3,
      company: "Onlyplay",
      role: "Ambassador Team Lead",
      period: "Jul 2025 – Jan 2026",
      brand: "#FF7043",
      description:
        "Recruited, trained, and led an international team of brand ambassadors across emerging markets. Defined content guidelines, supervised milestone execution, and built enduring professional relationships with creators.",
    },
    {
      id: "cjc-race",
      order: 4,
      company: "CJC Race",
      role: "Marketing Manager",
      period: "2024 – 2025",
      brand: "#EF4444",
      description:
        "Executed integrated marketing campaigns (digital ads, influencer partnerships, online tournaments) that accelerated player acquisition, game visibility, and brand reach.",
    },
    {
      id: "les-chainmakers",
      order: 5,
      company: "Les chainmakers",
      role: "Marketing Manager",
      period: "2022 – 2024",
      brand: "#8B5CF6",
      description:
        "Formulated marketing strategies to accelerate brand growth, negotiated partnership activations, and managed competitor benchmarking and audience communications.",
    },
    {
      id: "1xbet",
      order: 6,
      company: "1xBet",
      role: "Affiliate Manager",
      period: "2023 – 2024",
      brand: "#2563EB",
      description:
        "Cultivated strategic affiliate relationships, onboarded new traffic sources, and coordinated promotional materials to drive user acquisition.",
    },
    {
      id: "tapbit",
      order: 7,
      company: "Tapbit Crypto Exchange",
      role: "English – French Translator & Community Support",
      period: "Nov 2025 – Mar 2026",
      brand: "#0284C7",
      description:
        "Localized cryptocurrency documentation, market updates, and UI interfaces from English to French. Collaborated with marketing and community teams to engage francophone traders.",
    },
    {
      id: "onlyplay-cm",
      order: 8,
      company: "Onlyplay",
      role: "Social Media & Community Manager, Video Editor",
      period: "Current",
      brand: "#FF5722",
      description:
        "Managing and moderating official communities on Telegram, Discord, and X. Gathering player feedback to refine games, producing short-form video campaigns, hosting AMAs, and representing Onlyplay at international industry summits.",
    },
    {
      id: "topgoal",
      order: 9,
      company: "TopGoal French",
      role: "Community Manager",
      period: "Jan 2024 – Jul 2024",
      brand: "#F59E0B",
      description:
        "Moderated the official French Telegram community, coordinated interactive events, and delivered community insights to product managers.",
    },
    {
      id: "yescoin",
      order: 10,
      company: "Yescoin - French",
      role: "Community Manager",
      period: "2023 – 2024",
      brand: "#FBBF24",
      description:
        "Fostered a thriving Telegram community, provided real-time user assistance, organized promotional contests, and maintained vigilant anti-scam protection.",
    },
  ],
  education: [
    {
      id: "bachelor-translation",
      order: 1,
      school: "University Center of Adjarra, Porto-Novo, Benin",
      degree: "Bachelor’s Degree in English (English – French Translation)",
      period: "2025",
      tag: "DEGREE",
      brand: "#6366F1",
    },
    {
      id: "diploma-computing",
      order: 2,
      school: "Professional Institute",
      degree: "Administrative Computing Diploma",
      period: "2024",
      tag: "TECH",
      brand: "#0EA5E9",
    },
    {
      id: "baccalaureate",
      order: 3,
      school: "National High School Board",
      degree: "High School Diploma (Baccalaureate)",
      period: "2021 – 2022",
      tag: "BAC",
      brand: "#10B981",
    },
    {
      id: "speaker-credentials",
      order: 4,
      school: "International Industry Conferences",
      degree: "Speaker & Ambassador (SiGMA Africa, SBWA+ Dakar, iGaming AFRIKA)",
      period: "2026",
      tag: "SUMMIT",
      brand: "#F97316",
    },
  ],
  skills: [
    "Business Development & B2B Sales (iGaming & Web3)",
    "Strategic Partnerships & Dealmaking",
    "Exploring New Markets & Regional Expansion",
    "Affiliate Management & Team Leadership",
    "Event Coordination & International Summits",
    "Official Conference Speaker & Brand Ambassador",
    "Marketing Management & Growth Strategy",
    "Social Media & Community Management",
    "Short-form Video Production (CapCut, Premiere)",
    "English–French Translation & Localization",
    "Interactive AMAs & Player Tournaments",
    "Influencer Outreach & Media Buying",
  ],
  stack: [
    { id: "1", order: 1, label: "LinkedIn", slug: "linkedin", bg: "#0A66C2", fg: "#ffffff", iconUrl: "/icons/linkedin.svg" },
    { id: "2", order: 2, label: "Telegram", slug: "telegram", bg: "#229ED9", fg: "#ffffff", iconUrl: "/icons/telegram.svg" },
    { id: "3", order: 3, label: "X / Twitter", slug: "x", bg: "#111111", fg: "#ffffff", iconUrl: "/icons/x.svg" },
    { id: "4", order: 4, label: "Discord", slug: "discord", bg: "#5865F2", fg: "#ffffff", iconUrl: "/icons/discord.svg" },
    { id: "5", order: 5, label: "1xBet / 1win", slug: "affiliate", bg: "#1B59F8", fg: "#ffffff", iconUrl: "/icons/affiliate.svg" },
    { id: "6", order: 6, label: "Onlyplay", slug: "onlyplay", bg: "#FF4500", fg: "#ffffff", iconUrl: "/icons/onlyplay.svg" },
    { id: "7", order: 7, label: "Google Analytics", slug: "googleanalytics", bg: "#E37400", fg: "#ffffff", iconUrl: "/icons/googleanalytics.svg" },
    { id: "8", order: 8, label: "Notion", slug: "notion", bg: "#181717", fg: "#ffffff", iconUrl: "/icons/notion.svg" },
    { id: "9", order: 9, label: "CapCut", slug: "capcut", bg: "#000000", fg: "#ffffff", iconUrl: "/icons/capcut.svg" },
    { id: "10", order: 10, label: "Premiere Pro", slug: "premiere", bg: "#00005B", fg: "#9999FF", iconUrl: "/icons/premiere.svg" },
    { id: "11", order: 11, label: "Canva", slug: "canva", bg: "#00C4CC", fg: "#ffffff", iconUrl: "/icons/canva.svg" },
    { id: "12", order: 12, label: "Tapbit", slug: "tapbit", bg: "#0284C7", fg: "#ffffff", iconUrl: "/icons/tapbit.svg" },
  ],
};
