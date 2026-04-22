"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, isLocale, type Locale } from "../[lang]/locales";

export default function LocaleSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? `/${currentLocale}`;

  const buildHref = (target: Locale) => {
    const segments = pathname.split("/");
    // pathname is like "/ko/decks"; segments = ["", "ko", "decks"]
    if (segments.length >= 2 && isLocale(segments[1])) {
      segments[1] = target;
      return segments.join("/") || `/${target}`;
    }
    return `/${target}`;
  };

  return (
    <div
      className="relative group"
      aria-label={label}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[.06] hover:text-white"
        aria-haspopup="menu"
      >
        <span aria-hidden>🌐</span>
        <span>{localeLabels[currentLocale]}</span>
      </button>
      <ul
        role="menu"
        className="invisible absolute right-0 z-20 mt-2 flex min-w-[8rem] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a18] py-1 text-sm opacity-0 shadow-lg transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        {locales.map((loc) => {
          const active = loc === currentLocale;
          return (
            <li key={loc} role="none">
              <Link
                href={buildHref(loc)}
                role="menuitem"
                aria-current={active ? "true" : undefined}
                hrefLang={loc}
                className={`block px-3 py-1.5 transition-colors ${
                  active
                    ? "text-white"
                    : "text-zinc-400 hover:bg-white/[.06] hover:text-white"
                }`}
              >
                {localeLabels[loc]}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
