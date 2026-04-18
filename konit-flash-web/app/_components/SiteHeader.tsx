import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-white/[.08]">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/app-logo.png"
            alt=""
            width={28}
            height={28}
            className="rounded-[7px]"
            priority
          />
          <span className="text-base font-semibold tracking-tight">
            KonitFlash
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-300">
          <Link href="/guides" className="hover:text-white">
            활용법
          </Link>
          <Link href="/decks" className="hover:text-white">
            덱 공유
          </Link>
        </nav>
      </div>
    </header>
  );
}
