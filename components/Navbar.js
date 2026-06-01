import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="font-display text-xl font-medium tracking-tight text-ink">
            Cadu Veloso
          </span>
          <span className="eyebrow hidden sm:inline">Field Notes</span>
        </Link>

        <nav className="flex items-center gap-6 text-[12px] font-medium text-muted">
          <Link href="/" className="link-underline hover:text-ink">
            Experiments
          </Link>
          <a
            href="https://github.com/caduveloso"
            target="_blank"
            rel="noreferrer"
            className="link-underline hover:text-ink"
          >
            GitHub
          </a>
          <a
            href="https://x.com/codeveloso"
            target="_blank"
            rel="noreferrer"
            className="hidden link-underline hover:text-ink sm:inline"
          >
            X
          </a>
        </nav>
      </div>
    </header>
  );
}
