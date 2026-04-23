export type DeckCategory = "toeic" | "toefl" | "jlpt" | "hsk" | "general";
export type DeckLevel = "beginner" | "intermediate" | "advanced";
export type DeckLanguagePair = "en-ko" | "ja-ko" | "zh-ko";

export type Deck = {
  slug: string;
  file: string;
  cardCount: number;
  updatedAt: string;
  category: DeckCategory;
  level: DeckLevel;
  languagePair: DeckLanguagePair;
};

export const decks: Deck[] = [
  {
    slug: "toeic-basic-500",
    file: "toeic-basic-500.csv",
    cardCount: 5,
    updatedAt: "2026-04-18",
    category: "toeic",
    level: "beginner",
    languagePair: "en-ko",
  },
];
