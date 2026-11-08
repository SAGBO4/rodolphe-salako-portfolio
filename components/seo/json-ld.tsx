import type { ReactNode } from "react";
import { siteConfig } from "@/lib/metadata";

export function JsonLd(): ReactNode {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Rodolphe Salako",
    alternateName: "Zeki",
    url: siteConfig.url,
    image: `${siteConfig.url}/rodolphe.webp`,
    jobTitle: "Business Development & Strategic Partnerships Professional",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Porto-Novo",
      addressCountry: "Benin",
    },
    sameAs: [
      "https://www.linkedin.com/in/rodolphe-salako-578885334",
      "https://x.com/ZekiZeki40",
      "https://t.me/Zekizeki40",
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "Block-Scholars Africa",
        url: "https://www.linkedin.com/company/blockscholars-africa",
      },
      {
        "@type": "Organization",
        name: "ONLYPLAY",
        url: "https://onlyplay.net",
      },
    ],
    knowsAbout: [
      "Business Development",
      "Strategic Partnerships",
      "iGaming",
      "Web3",
      "Affiliate Team Leadership",
      "Lead Generation",
      "Commercial Dealmaking",
      "International Event Speaking",
      "English–French Translation",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Centre Universitaire d'Adjarra",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: "Rodolphe Salako | Official Portfolio",
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#person`,
    },
    inLanguage: ["fr-FR", "en-US"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
