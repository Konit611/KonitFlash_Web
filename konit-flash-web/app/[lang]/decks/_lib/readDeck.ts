import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseCsv } from "./parseCsv";

export type DeckCard = { front: string; back: string };

export async function readDeckCards(file: string): Promise<DeckCard[]> {
  const filePath = path.join(process.cwd(), "public", "decks", file);
  const raw = await readFile(filePath, "utf8");
  const rows = parseCsv(raw);
  if (rows.length === 0) return [];

  const [header, ...data] = rows;
  const frontIdx = header.findIndex((h) => h.trim().toLowerCase() === "front");
  const backIdx = header.findIndex((h) => h.trim().toLowerCase() === "back");
  if (frontIdx === -1 || backIdx === -1) return [];

  return data
    .map((r) => ({ front: r[frontIdx] ?? "", back: r[backIdx] ?? "" }))
    .filter((c) => c.front !== "" || c.back !== "");
}
