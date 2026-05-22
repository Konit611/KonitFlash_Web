import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { decks } from "../_data/decks";
import { readDeckCards } from "../_lib/readDeck";
import {
  getDictionary,
  hasLocale,
  type Dictionary,
} from "../../dictionaries";
import { appStoreUrl } from "../../locales";

const PREVIEW_LIMIT = 20;

export async function generateStaticParams() {
  return decks.map((deck) => ({ slug: deck.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/decks/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const deck = decks.find((d) => d.slug === slug);
  if (!deck) return {};
  const dict = await getDictionary(lang);
  const item = dict.deckItems[slug as keyof typeof dict.deckItems];
  const deckTitle = item?.title ?? slug;
  return {
    title: dict.meta.deckDetail.titleTemplate.replace("{deckTitle}", deckTitle),
    description: item?.description,
  };
}

export default async function DeckDetailPage({
  params,
}: PageProps<"/[lang]/decks/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const deck = decks.find((d) => d.slug === slug);
  if (!deck) notFound();

  const dict = await getDictionary(lang);
  const detail = dict.deckDetail;
  const item = dict.deckItems[slug as keyof typeof dict.deckItems] ?? {
    title: slug,
    description: "",
  };

  const cards = await readDeckCards(deck.file);
  const previewCards = cards.slice(0, PREVIEW_LIMIT);
  const hasMore = cards.length > previewCards.length;

  const previewNote = hasMore
    ? detail.previewNote
        .replace("{shown}", previewCards.length.toString())
        .replace("{rest}", (cards.length - previewCards.length).toString())
    : detail.previewNoteAll.replace("{total}", cards.length.toString());

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16">
      <Link
        href={`/${lang}/decks`}
        className="inline-block text-sm text-zinc-400 hover:text-white"
      >
        {detail.backToList}
      </Link>

      <header className="mt-8 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <Chip color="lime">
            {dict.deckFilters.category[deck.category]}
          </Chip>
          <Chip color="mint">{dict.deckFilters.level[deck.level]}</Chip>
          <Chip color="pink">
            {dict.deckFilters.languagePair[deck.languagePair]}
          </Chip>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {item.title}
        </h1>
        {item.description && (
          <p className="max-w-2xl text-zinc-300">{item.description}</p>
        )}
        <p className="text-xs text-zinc-500">
          {cards.length.toLocaleString()}
          {dict.decksPreview.cardCountSuffix} · {deck.updatedAt}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={`/decks/${deck.file}`}
            download
            className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-5 py-2.5 text-sm font-semibold text-[#040422] transition-colors hover:bg-brand-pink-strong"
          >
            {detail.downloadCsv}
          </a>
          <a
            href={appStoreUrl(lang)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[.06]"
          >
            {detail.openInApp}
          </a>
        </div>
      </header>

      <section className="mt-16">
        <div className="mb-6 flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-brand-lime">
            {detail.previewEyebrow}
          </span>
          <h2 className="text-2xl font-semibold tracking-tight">
            {detail.previewHeading}
          </h2>
          <p className="text-sm text-zinc-400">{previewNote}</p>
        </div>
        <CardPreviewTable cards={previewCards} detail={detail} />
      </section>

      <HowToUse detail={detail} />
    </section>
  );
}

function CardPreviewTable({
  cards,
  detail,
}: {
  cards: { front: string; back: string }[];
  detail: Dictionary["deckDetail"];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[.08]">
      <div className="grid grid-cols-[1fr_1fr] border-b border-white/[.08] bg-white/[.03] text-xs font-medium uppercase tracking-wider text-zinc-400">
        <div className="px-4 py-3">{detail.front}</div>
        <div className="px-4 py-3">{detail.back}</div>
      </div>
      <ul>
        {cards.map((card, i) => (
          <li
            key={i}
            className="grid grid-cols-[1fr_1fr] border-b border-white/[.06] text-sm last:border-b-0"
          >
            <div className="px-4 py-3 text-zinc-100">{card.front}</div>
            <div className="px-4 py-3 text-zinc-400">{card.back}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowToUse({ detail }: { detail: Dictionary["deckDetail"] }) {
  const steps = [
    { title: detail.howToStep1Title, body: detail.howToStep1Body },
    { title: detail.howToStep2Title, body: detail.howToStep2Body },
    { title: detail.howToStep3Title, body: detail.howToStep3Body },
  ];
  return (
    <section className="mt-16 border-t border-white/[.06] pt-12">
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-brand-mint">
          {detail.howToEyebrow}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">
          {detail.howToHeading}
        </h2>
      </div>
      <ol className="grid gap-4 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={i}
            className="flex flex-col gap-2 rounded-2xl border border-white/[.08] bg-white/[.02] p-5"
          >
            <span className="text-xs font-medium text-brand-pink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-base font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="text-sm text-zinc-400">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Chip({
  color,
  children,
}: {
  color: "lime" | "mint" | "pink";
  children: React.ReactNode;
}) {
  const styles: Record<typeof color, string> = {
    lime: "border-brand-lime/40 text-brand-lime",
    mint: "border-brand-mint/40 text-brand-mint",
    pink: "border-brand-pink/40 text-brand-pink",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles[color]}`}
    >
      {children}
    </span>
  );
}
