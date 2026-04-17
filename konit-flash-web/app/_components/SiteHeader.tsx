import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          KonitFlash
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/guides" className="hover:underline">
            활용법
          </Link>
          <Link href="/decks" className="hover:underline">
            덱 공유
          </Link>
        </nav>
      </div>
    </header>
  );
}
