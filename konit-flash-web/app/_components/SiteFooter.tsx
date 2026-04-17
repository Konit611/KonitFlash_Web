export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6 text-xs text-zinc-600 dark:text-zinc-400">
        <span>© {new Date().getFullYear()} KonitFlash</span>
      </div>
    </footer>
  );
}
