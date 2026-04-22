import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decks } from "./_data/decks";
import { getDictionary, hasLocale } from "../dictionaries";

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

      {decks.length === 0 ? (
        <p className="text-sm text-zinc-500">{dict.decksPage.empty}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {decks.map((deck) => {
            const item = dict.deckItems[
              deck.slug as keyof typeof dict.deckItems
            ] ?? { title: deck.slug, description: "" };
            return (
              <li
                key={deck.slug}
                className="flex flex-col gap-3 rounded-2xl border border-white/[.08] bg-white/[.02] p-6"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-400">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 text-xs text-zinc-500">
                  <span>
                    {deck.cardCount.toLocaleString()}
                    {dict.decksPreview.cardCountSuffix} · {deck.updatedAt}
                  </span>
                  <a
                    href={`/decks/${deck.file}`}
                    download
                    className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/[.06]"
                  >
                    {dict.decksPage.download}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
