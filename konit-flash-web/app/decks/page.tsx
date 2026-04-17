import { decks } from "./_data/decks";

export const metadata = {
  title: "덱 공유 — KonitFlash",
};

export default function DecksPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">덱 공유</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          바로 가져다 쓸 수 있는 CSV 덱을 다운로드하세요.
        </p>
      </header>

      {decks.length === 0 ? (
        <p className="text-sm text-zinc-500">아직 공유된 덱이 없습니다.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {decks.map((deck) => (
            <li
              key={deck.slug}
              className="flex flex-col gap-3 rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]"
            >
              <div className="flex-1">
                <h2 className="text-lg font-medium tracking-tight">
                  {deck.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {deck.description}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>
                  {deck.cardCount.toLocaleString()}장 · {deck.updatedAt}
                </span>
                <a
                  href={`/decks/${deck.file}`}
                  download
                  className="rounded-full border border-black/[.08] px-3 py-1 text-xs font-medium text-zinc-950 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-white/[.06]"
                >
                  CSV 다운로드
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
