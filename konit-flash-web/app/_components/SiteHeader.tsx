import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "../[lang]/dictionaries";
import LocaleSwitcher from "./LocaleSwitcher";

export default function SiteHeader({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="w-full border-b border-white/[.08]">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Image
            src="/app-logo.png"
            alt=""
            width={28}
            height={28}
            className="rounded-[7px]"
            priority
          />
          <span className="text-base font-semibold tracking-tight">
            KonitFlash
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <Link href={`/${lang}/guides`} className="hover:text-white">
            {dict.nav.guides}
          </Link>
          <Link href={`/${lang}/decks`} className="hover:text-white">
            {dict.nav.decks}
          </Link>
          <LocaleSwitcher currentLocale={lang} label={dict.nav.language} />
        </nav>
      </div>
    </header>
  );
}
