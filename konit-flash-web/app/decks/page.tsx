import { decks } from "./_data/decks";

export const metadata = {
  title: "덱 공유 — KonitFlash",
};

export default function DecksPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <header className="mb-10 flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-brand-lime">
          Shared Decks
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          덱 공유
        </h1>
        <p className="max-w-xl text-zinc-300">
          바로 가져다 쓸 수 있는 CSV 덱을 다운로드하세요. 앱에서 &quot;CSV 임포트&quot;로 불러오면 곧장 학습할 수 있습니다.
        </p>
      </header>

      {decks.length === 0 ? (
        <p className="text-sm text-zinc-500">아직 공유된 덱이 없습니다.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {decks.map((deck) => (
            <li
              key={deck.slug}
              className="flex flex-col gap-3 rounded-2xl border border-white/[.08] bg-white/[.02] p-6"
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold tracking-tight">
                  {deck.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  {deck.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 text-xs text-zinc-500">
                <span>
                  {deck.cardCount.toLocaleString()}장 · {deck.updatedAt}
                </span>
                <a
                  href={`/decks/${deck.file}`}
                  download
                  className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/[.06]"
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
