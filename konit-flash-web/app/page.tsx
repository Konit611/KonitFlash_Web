import Image from "next/image";
import Link from "next/link";
import { decks } from "./decks/_data/decks";

const APP_STORE_URL = ""; // TODO: fill when live

const features = [
  {
    accent: "bg-brand-pink",
    title: "SM-2 간격 반복",
    body: "Again · Hard · Good · Easy 네 단계 평가만 하면, 알고리즘이 잊기 직전의 시점에 복습을 예약합니다.",
  },
  {
    accent: "bg-brand-lime",
    title: "CSV 임포트",
    body: "NotebookLM 등에서 내보낸 CSV를 그대로 불러오세요. 앞/뒤 두 컬럼이면 곧장 플래시카드가 됩니다.",
  },
  {
    accent: "bg-brand-mint",
    title: "iCloud 동기화",
    body: "iPhone에서 시작하고 Mac에서 이어가세요. 덱·카드·학습 기록이 자동으로 동기화됩니다.",
  },
  {
    accent: "bg-brand-badge",
    title: "3D 카드 플립",
    body: "답을 확인할 때의 플립 애니메이션. 작은 만족감이 꾸준함을 만듭니다.",
  },
  {
    accent: "bg-brand-pink",
    title: "학습 통계",
    body: "연속 학습일, 오늘의 복습량, 지난 7일 활동을 한눈에 확인합니다.",
  },
  {
    accent: "bg-brand-lime",
    title: "Mac 키보드 지원",
    body: "Space로 카드 플립, 1–4 키로 등급. Mac에서는 마우스 없이도 학습이 끊기지 않습니다.",
  },
];

export default function Home() {
  const previewDecks = decks.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="flex flex-col items-start gap-8">
          <Image
            src="/app-logo.png"
            alt="KonitFlash 앱 아이콘"
            width={96}
            height={96}
            className="rounded-[22px] shadow-[0_8px_32px_rgba(255,127,209,0.25)]"
            priority
          />
          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-medium text-brand-pink">
              SM-2 간격 반복 플래시카드
            </span>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              잊기 직전에, 정확히<br />한 번 더 보여주는 앱.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-300">
              KonitFlash는 과학적으로 검증된 SM-2 알고리즘으로
              카드마다 최적의 복습 시점을 계산합니다.
              직접 만든 덱이든, CSV로 불러온 덱이든 — 더 적게 공부하고 더 오래 기억하세요.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <DownloadButton />
            <Link
              href="/decks"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[.06]"
            >
              덱 둘러보기
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/[.06]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
          <div className="mb-12 flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-brand-mint">
              Features
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              꾸준함을 만드는 여섯 가지 장치
            </h2>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="flex flex-col gap-4 rounded-2xl border border-white/[.08] bg-white/[.02] p-6"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${feature.accent}`}
                  aria-hidden
                />
                <h3 className="text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {feature.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Decks preview */}
      <section className="border-t border-white/[.06]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-brand-lime">
                Shared Decks
              </span>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                바로 가져다 쓰는 CSV 덱
              </h2>
            </div>
            <Link
              href="/decks"
              className="shrink-0 text-sm text-zinc-300 hover:text-white"
            >
              전체 보기 →
            </Link>
          </div>
          {previewDecks.length === 0 ? (
            <p className="text-sm text-zinc-500">곧 첫 번째 덱이 공유됩니다.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {previewDecks.map((deck) => (
                <li
                  key={deck.slug}
                  className="flex flex-col gap-3 rounded-2xl border border-white/[.08] bg-white/[.02] p-5"
                >
                  <h3 className="text-base font-semibold tracking-tight">
                    {deck.title}
                  </h3>
                  <p className="text-sm text-zinc-400">{deck.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-2 text-xs text-zinc-500">
                    <span>
                      {deck.cardCount.toLocaleString()}장 · {deck.updatedAt}
                    </span>
                    <a
                      href={`/decks/${deck.file}`}
                      download
                      className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white/[.06]"
                    >
                      CSV
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/[.06]">
        <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-28">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[.04] to-transparent p-10 sm:p-14">
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              오늘 본 카드를, 내일도 기억하고 싶다면.
            </h2>
            <p className="max-w-xl text-zinc-300">
              KonitFlash를 설치하고 첫 덱을 만들어보세요. 몇 분이면 충분합니다.
            </p>
            <DownloadButton />
          </div>
        </div>
      </section>
    </div>
  );
}

function DownloadButton() {
  const disabled = !APP_STORE_URL;
  const label = disabled ? "App Store 출시 예정" : "App Store에서 다운로드";

  if (disabled) {
    return (
      <span
        aria-disabled
        className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-brand-pink px-5 py-2.5 text-sm font-semibold text-[#040422] opacity-70"
      >
        {label}
      </span>
    );
  }

  return (
    <a
      href={APP_STORE_URL}
      className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-5 py-2.5 text-sm font-semibold text-[#040422] transition-colors hover:bg-brand-pink-strong"
    >
      {label}
    </a>
  );
}
