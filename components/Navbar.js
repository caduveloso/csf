import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-paper font-mono text-sm font-bold">
            cv
          </span>
          <span className="leading-none">
            <span className="block text-[15px] font-bold tracking-tight text-ink">
              Cadu Veloso
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Field Notes
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
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
