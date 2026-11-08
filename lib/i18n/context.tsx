"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  PORTFOLIO_ENGLISH_OVERLAY,
  PORTFOLIO_FRENCH_OVERLAY,
  translations,
  type Language,
  type TranslationKey,
} from "./translations";
import type { PortfolioData } from "../portfolio-data";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  localizeData: (data: PortfolioData) => PortfolioData;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: TranslationKey) => translations.en[key] ?? key,
  localizeData: (data: PortfolioData) => data,
});

const STORAGE_KEY = "portfolio_lang";

export function LanguageProvider({ children }: { children: ReactNode }): ReactNode {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "fr" || stored === "en") {
        setLanguageState(stored);
        document.documentElement.lang = stored;
        return;
      }
      // If no stored preference, detect browser language
      if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("fr")) {
        setLanguageState("fr");
        document.documentElement.lang = "fr";
      } else {
        document.documentElement.lang = "en";
      }
    } catch {
      // Ignore localStorage access issues in sandbox/private mode
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
    } catch {
      // Ignore localStorage write failure
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "fr" : "en");
  }, [language, setLanguage]);

  const t = useCallback(
    (key: TranslationKey): string => {
      const dict = translations[language] || translations.en;
      return (dict as Record<string, string>)[key] || translations.en[key] || key;
    },
    [language]
  );

  const localizeData = useCallback(
    (baseData: PortfolioData): PortfolioData => {
      if (!baseData) {
        return baseData;
      }

      const overlay = language === "fr" ? PORTFOLIO_FRENCH_OVERLAY : PORTFOLIO_ENGLISH_OVERLAY;
      return {
        ...baseData,
        profile: {
          ...baseData.profile,
          role: overlay.profile.role,
          greeting: overlay.profile.greeting,
          heroIntro: overlay.profile.heroIntro,
          heroTitle1: overlay.profile.heroTitle1,
          heroTitle2: overlay.profile.heroTitle2,
          heroDescription: overlay.profile.heroDescription,
          aboutTagline: overlay.profile.aboutTagline,
          aboutParagraphs: overlay.profile.aboutParagraphs,
          mission: overlay.profile.mission,
          stats: overlay.profile.stats,
          availability: overlay.profile.availability,
        },
        projects: baseData.projects.map((proj) => {
          const match = overlay.projects.find((p) => p.id === proj.id);
          if (!match) return proj;
          return {
            ...proj,
            title: match.title,
            company: match.company ?? proj.company,
            period: match.period ?? proj.period,
            category: match.category,
            meta: match.meta,
            description: match.description,
          };
        }),
        experiences: baseData.experiences.map((exp) => {
          const match = overlay.experiences.find((e) => e.id === exp.id);
          if (!match) return exp;
          return {
            ...exp,
            role: match.role,
            period: match.period,
            description: match.description,
          };
        }),
        education: baseData.education.map((edu) => {
          const match = overlay.education.find((e) => e.id === edu.id);
          if (!match) return edu;
          return {
            ...edu,
            degree: match.degree,
            school: match.school,
            tag: match.tag,
          };
        }),
        events: baseData.events
          ? baseData.events.map((ev) => {
              const match = overlay.events?.find((e) => e.id === ev.id);
              if (!match) return ev;
              return {
                ...ev,
                title: match.title ?? ev.title,
                city: match.city ?? ev.city,
                country: match.country ?? ev.country,
                date: match.date ?? ev.date,
                summary: match.summary ?? ev.summary,
              };
            })
          : baseData.events,
        skills: overlay.skills && overlay.skills.length > 0 ? overlay.skills : baseData.skills,
      };
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        localizeData,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
}
