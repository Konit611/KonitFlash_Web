"use client";

import { useMemo, useState } from "react";
import type {
  Deck,
  DeckCategory,
  DeckLanguagePair,
  DeckLevel,
} from "../_data/decks";

type DeckItem = { title: string; description: string };

export type DeckListDict = {
  empty: string;
  noResults: string;
  download: string;
  cardCountSuffix: string;
  filters: {
    all: string;
    category: string;
    level: string;
    languagePair: string;
  };
  categoryLabels: Record<DeckCategory, string>;
  levelLabels: Record<DeckLevel, string>;
  languagePairLabels: Record<DeckLanguagePair, string>;
};

type Props = {
  decks: Deck[];
  items: Record<string, DeckItem>;
  dict: DeckListDict;
};

export default function DeckList({ decks, items, dict }: Props) {
  const [category, setCategory] = useState<DeckCategory | "all">("all");
  const [level, setLevel] = useState<DeckLevel | "all">("all");
  const [languagePair, setLanguagePair] = useState<DeckLanguagePair | "all">(
    "all",
  );

  const categories = useMemo(
    () => Array.from(new Set(decks.map((d) => d.category))),
    [decks],
  );
  const levels = useMemo(
    () => Array.from(new Set(decks.map((d) => d.level))),
    [decks],
  );
  const pairs = useMemo(
    () => Array.from(new Set(decks.map((d) => d.languagePair))),
    [decks],
  );

  const filtered = decks.filter(
    (d) =>
      (category === "all" || d.category === category) &&
      (level === "all" || d.level === level) &&
      (languagePair === "all" || d.languagePair === languagePair),
  );

  if (decks.length === 0) {
    return <p className="text-sm text-zinc-500">{dict.empty}</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <FilterRow
          label={dict.filters.category}
          allLabel={dict.filters.all}
          value={category}
          onChange={setCategory}
          options={categories}
          optionLabels={dict.categoryLabels}
        />
        <FilterRow
          label={dict.filters.level}
          allLabel={dict.filters.all}
          value={level}
          onChange={setLevel}
          options={levels}
          optionLabels={dict.levelLabels}
        />
        <FilterRow
          label={dict.filters.languagePair}
          allLabel={dict.filters.all}
          value={languagePair}
          onChange={setLanguagePair}
          options={pairs}
          optionLabels={dict.languagePairLabels}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-500">{dict.noResults}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((deck) => {
            const item = items[deck.slug] ?? {
              title: deck.slug,
              description: "",
            };
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
                    {dict.cardCountSuffix} · {deck.updatedAt}
                  </span>
                  <a
                    href={`/decks/${deck.file}`}
                    download
                    className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/[.06]"
                  >
                    {dict.download}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterRow<T extends string>({
  label,
  allLabel,
  value,
  onChange,
  options,
  optionLabels,
}: {
  label: string;
  allLabel: string;
  value: T | "all";
  onChange: (v: T | "all") => void;
  options: T[];
  optionLabels: Record<T, string>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="min-w-16 text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <Chip active={value === "all"} onClick={() => onChange("all")}>
        {allLabel}
      </Chip>
      {options.map((opt) => (
        <Chip
          key={opt}
          active={value === opt}
          onClick={() => onChange(opt)}
        >
          {optionLabels[opt] ?? opt}
        </Chip>
      ))}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
        (active
          ? "border-brand-lime/60 bg-brand-lime/10 text-brand-lime"
          : "border-white/15 text-zinc-300 hover:bg-white/[.06]")
      }
    >
      {children}
    </button>
  );
}
