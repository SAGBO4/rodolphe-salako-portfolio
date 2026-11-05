"use client";

import { useLanguage } from "@/lib/i18n/context";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_PORTFOLIO_DATA, PortfolioData } from "./portfolio-data";

type PortfolioContextType = {
  data: PortfolioData;
  rawData: PortfolioData;
  loading: boolean;
  refresh: () => Promise<void>;
};

const PortfolioContext = createContext<PortfolioContextType>({
  data: DEFAULT_PORTFOLIO_DATA,
  rawData: DEFAULT_PORTFOLIO_DATA,
  loading: false,
  refresh: async () => {},
});

export function PortfolioProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: PortfolioData;
}): ReactNode {
  const [rawData, setRawData] = useState<PortfolioData>(initialData ?? DEFAULT_PORTFOLIO_DATA);
  const [loading, setLoading] = useState(false);
  const { localizeData } = useLanguage();

  const fetchLatest = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/content", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json && json.profile) {
          setRawData(json);
        }
      }
    } catch (e) {
      console.warn("Could not fetch latest portfolio content:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchLatest();
  }, []);

  const localizedData = localizeData(rawData);

  return (
    <PortfolioContext.Provider
      value={{
        data: localizedData,
        rawData,
        loading,
        refresh: fetchLatest,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextType {
  return useContext(PortfolioContext);
}
