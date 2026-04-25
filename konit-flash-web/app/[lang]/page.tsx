import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { decks } from "./decks/_data/decks";
import {
  getDictionary,
  hasLocale,
  type Dictionary,
} from "./dictionaries";
import { appStoreUrl } from "./locales";

const FEATURE_KEYS = ["sm2", "csv", "icloud", "flip", "stats", "mac"] as const;
const FEATURE_ACCENTS: Record<(typeof FEATURE_KEYS)[number], string> = {
  sm2: "bg-brand-pink",
  csv: "bg-brand-lime",
  icloud: "bg-brand-mint",
  flip: "bg-brand-badge",
  stats: "bg-brand-pink",
  mac: "bg-brand-lime",
};

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const previewDecks = decks.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="flex flex-col items-start gap-8">
          <Image
            src="/app-logo.png"
            alt="KonitFlash"
            width={96}
            height={96}
            className="rounded-[22px] shadow-[0_8px_32px_rgba(255,127,209,0.25)]"
            priority
          />
          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-medium text-brand-pink">
              {dict.hero.badge}
            </span>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              {dict.hero.titleLine1}
              <br />
              {dict.hero.titleLine2}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-300">
              {dict.hero.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <DownloadButton dict={dict} href={appStoreUrl(lang)} />
            <Link
              href={`/${lang}/decks`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[.06]"
            >
              {dict.hero.browseDecks}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/[.06]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
          <div className="mb-12 flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-brand-mint">
              {dict.features.eyebrow}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.features.heading}
            </h2>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_KEYS.map((key) => {
              const item = dict.features.items[key];
              return (
                <li
                  key={key}
                  className="flex flex-col gap-4 rounded-2xl border border-white/[.08] bg-white/[.02] p-6"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${FEATURE_ACCENTS[key]}`}
                    aria-hidden
                  />
                  <h3 className="text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {item.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Decks preview */}
      <section className="border-t border-white/[.06]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-brand-lime">
                {dict.decksPreview.eyebrow}
              </span>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.decksPreview.heading}
              </h2>
            </div>
            <Link
              href={`/${lang}/decks`}
              className="shrink-0 text-sm text-zinc-300 hover:text-white"
            >
              {dict.decksPreview.seeAll}
            </Link>
          </div>
          {previewDecks.length === 0 ? (
            <p className="text-sm text-zinc-500">{dict.decksPreview.empty}</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {previewDecks.map((deck) => {
                const item = dict.deckItems[
                  deck.slug as keyof typeof dict.deckItems
                ] ?? { title: deck.slug, description: "" };
                return (
                  <li
                    key={deck.slug}
                    className="flex flex-col gap-3 rounded-2xl border border-white/[.08] bg-white/[.02] p-5"
                  >
                    <h3 className="text-base font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400">{item.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-2 text-xs text-zinc-500">
                      <span>
                        {deck.cardCount.toLocaleString()}
                        {dict.decksPreview.cardCountSuffix} · {deck.updatedAt}
                      </span>
                      <a
                        href={`/decks/${deck.file}`}
                        download
                        className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/[.06]"
                      >
                        {dict.decksPreview.csvLabel}
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/[.06]">
        <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-28">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[.04] to-transparent p-10 sm:p-14">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {dict.finalCta.heading}
            </h2>
            <p className="max-w-xl text-zinc-300">{dict.finalCta.body}</p>
            <DownloadButton dict={dict} href={appStoreUrl(lang)} />
          </div>
        </div>
      </section>
    </div>
  );
}

function DownloadButton({ dict, href }: { dict: Dictionary; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-5 py-2.5 text-sm font-semibold text-[#040422] transition-colors hover:bg-brand-pink-strong"
    >
      {dict.cta.download}
    </a>
  );
}
