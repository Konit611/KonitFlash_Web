export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/[.08]">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6 text-xs text-zinc-500">
        <span>© {new Date().getFullYear()} KonitFlash</span>
      </div>
    </footer>
  );
}
