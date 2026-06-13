import Link from "next/link";

export default function Header() {
  return (
    <header
      className="absolute top-0 left-0 right-0 z-20"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/90 text-ink font-display font-semibold text-sm transition-transform group-hover:scale-105">
            H
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-cream">
            HausPotenzial
          </span>
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-sm text-cream/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
          Kostenlos &amp; unverbindlich
        </div>
      </div>
    </header>
  );
}
