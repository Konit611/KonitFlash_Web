export type Deck = {
  slug: string;
  file: string;
  cardCount: number;
  updatedAt: string;
};

export const decks: Deck[] = [
  {
    slug: "toeic-basic-500",
    file: "toeic-basic-500.csv",
    cardCount: 5,
    updatedAt: "2026-04-18",
  },
];
