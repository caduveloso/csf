import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-6 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Field Notes
          </p>
          <p className="mt-2 max-w-sm font-serif text-lg leading-snug text-ink">
            A working journal of experiments in agentic design, audio, and
            software — by Cadu Veloso.
          </p>
        </div>
        <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <Link href="/" className="link-underline hover:text-ink">
            Index
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
            className="link-underline hover:text-ink"
          >
            X
          </a>
        </div>
      </div>
    </footer>
  );
}
