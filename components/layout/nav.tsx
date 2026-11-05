"use client";

import { useLanguage } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type NavItem = {
  labelKey: "nav.home" | "nav.projects" | "nav.about";
  href: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.projects", href: "/projects" },
  { labelKey: "nav.about", href: "/about" },
];

export function Nav(): ReactNode {
  const { t } = useLanguage();
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [pillRect, setPillRect] = useState<{
    x: number;
    width: number;
  } | null>(null);
  const [hasMeasured, setHasMeasured] = useState(false);

  const activeIndex = NAV_ITEMS.findIndex((item) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  useLayoutEffect(() => {
    const list = listRef.current;
    const activeEl =
      activeIndex >= 0 ? itemRefs.current[activeIndex] : null;
    if (!list || !activeEl) {
      setPillRect(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    setPillRect({
      x: itemRect.left - listRect.left,
      width: itemRect.width,
    });
  }, [activeIndex, pathname, t]);

  useEffect(() => {
    if (!pillRect) return;
    const id = requestAnimationFrame(() => setHasMeasured(true));
    return () => cancelAnimationFrame(id);
  }, [pillRect]);

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-3 sm:top-6 z-50 -translate-x-1/2 max-w-[calc(100vw-1.5rem)]"
    >
      <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-background/95 p-1 sm:p-1.5 shadow-sm border border-foreground/10 backdrop-blur-md">
        <ul ref={listRef} className="relative flex items-center gap-0.5 sm:gap-1">
          {pillRect && (
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{ x: pillRect.x, width: pillRect.width }}
              transition={
                hasMeasured
                  ? { type: "spring", stiffness: 380, damping: 32 }
                  : { duration: 0 }
              }
              style={{ left: 0, top: 0, bottom: 0 }}
              className="absolute rounded-full bg-foreground/5 ring-1 ring-foreground/8"
            />
          )}
          {NAV_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={item.href}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="relative shrink-0"
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className="focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-colors duration-300 whitespace-nowrap"
                >
                  <span
                    className={
                      isActive
                        ? "relative z-10 text-foreground font-semibold"
                        : "relative z-10 text-foreground/60 hover:text-foreground"
                    }
                  >
                    {t(item.labelKey)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="h-3.5 sm:h-4 w-[1px] bg-foreground/15 mx-0.5" aria-hidden="true" />
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
