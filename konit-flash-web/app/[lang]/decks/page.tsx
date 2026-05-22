import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decks } from "./_data/decks";
import { getDictionary, hasLocale } from "../dictionaries";
import DeckList from "./_components/DeckList";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/decks">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.decks.title };
}

export default async function DecksPage({
  params,
}: PageProps<"/[lang]/decks">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <header className="mb-10 flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-brand-lime">
          {dict.decksPage.eyebrow}
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.decksPage.heading}
        </h1>
        <p className="max-w-xl text-zinc-300">{dict.decksPage.description}</p>
      </header>

      <DeckList
        lang={lang}
        decks={decks}
        items={dict.deckItems}
        dict={{
          empty: dict.decksPage.empty,
          noResults: dict.decksPage.noResults,
          download: dict.decksPage.download,
          cardCountSuffix: dict.decksPreview.cardCountSuffix,
          filters: dict.decksPage.filters,
          categoryLabels: dict.deckFilters.category,
          levelLabels: dict.deckFilters.level,
          languagePairLabels: dict.deckFilters.languagePair,
        }}
      />
    </section>
  );
}
