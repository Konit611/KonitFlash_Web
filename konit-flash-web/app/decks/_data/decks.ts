export type Deck = {
  slug: string;
  title: string;
  description: string;
  file: string;
  cardCount: number;
  updatedAt: string;
};

export const decks: Deck[] = [
  {
    slug: "toeic-basic-500",
    title: "TOEIC 기초 (샘플 5장)",
    description: "CSV 포맷 확인용 샘플 덱. front, back 두 컬럼 구조.",
    file: "toeic-basic-500.csv",
    cardCount: 5,
    updatedAt: "2026-04-18",
  },
];
