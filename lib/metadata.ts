import type { Metadata } from "next";

export const siteConfig = {
  name: "Rodolphe Salako",
  description:
    "Business Development and Sales professional with experience across iGaming, Web3, real estate, and financial services. Focused on B2B sales, strategic partnerships, affiliate leadership, exploring new markets, and driving growth.",
  url: "https://www.rodolphesalako.com",
  ogImage: "/rodolphe.webp",
  creator: "@ZekiZeki40",
  authors: [
    {
      name: "Rodolphe Salako",
      url: "https://www.rodolphesalako.com",
    },
  ],
  keywords: [
    "Rodolphe Salako",
    "Business Development",
    "Strategic Partnerships",
    "B2B Sales",
    "Lead Generation",
    "iGaming",
    "Web3",
    "Real Estate",
    "Financial Services",
    "Affiliate Manager",
    "Team Leadership",
    "Block-Scholars",
    "Event Speaker",
    "SiGMA Africa",
    "SBWA+",
    "Market Expansion",
    "Onlyplay",
    "1win",
    "1xBet",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Business Development & Strategic Partnerships`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "https://www.rodolphesalako.com",
      "en-US": "https://www.rodolphesalako.com",
      "x-default": "https://www.rodolphesalako.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | Business Development & Strategic Partnerships`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Business Development & Strategic Partnerships`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon-192.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Rodolphe Salako",
  },
  manifest: "/manifest.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "fr-FR": url,
        "en-US": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
