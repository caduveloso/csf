import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import Cover from '../components/Cover';

export async function getStaticProps() {
  const files = fs.readdirSync('posts');

  const posts = files
    .filter((f) => f.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace('.md', '');
      const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
      const { data: frontmatter } = matter(readFile);
      return { slug, frontmatter };
    })
    .sort(
      (a: any, b: any) =>
        (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99)
    );

  return { props: { posts } };
}

export default function Home({ posts }: any) {
  const featured = posts.filter((p: any) => p.frontmatter.featured);
  const count = posts.length;

  return (
    <div className="mx-auto max-w-page px-5 sm:px-8">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-line pb-14 pt-16 sm:pt-24">
        <p className="eyebrow">Cadu Veloso · A journal of AI experiments</p>
        <h1 className="display mt-5 max-w-4xl text-[2.6rem] leading-[1.03] text-ink sm:text-6xl">
          Field notes on teaching{' '}
          <span className="text-accent">machines to make things</span> —
          documents, music, software.
        </h1>
        <p className="mt-7 max-w-2xl font-serif text-xl leading-relaxed text-inksoft">
          I&apos;m a designer-engineer. For the last stretch I&apos;ve been
          building with agents: handing them real tools — page-layout software,
          audio, codebases, browsers — and studying where they shine, where they
          break, and the patterns that make them dependable. This is the
          lab notebook. Each entry is one experiment, written to be{' '}
          <em>useful to copy</em>, not just admired.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span>{count} experiments</span>
          <span className="text-faint">/</span>
          <span>Agentic design · Audio · Infrastructure</span>
          <span className="text-faint">/</span>
          <span>Updated 2026</span>
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-14">
          <div className="mb-7 flex items-baseline justify-between">
            <h2 className="eyebrow">Selected</h2>
            <span className="font-mono text-[11px] text-faint">★</span>
          </div>
          <div className="grid gap-7 md:grid-cols-2">
            {featured.map(({ slug, frontmatter }: any, i: number) => (
              <Link
                key={slug}
                href={`/post/${slug}`}
                className="group block overflow-hidden rounded-2xl border border-line bg-card transition-shadow hover:shadow-[0_18px_50px_-22px_rgba(20,20,30,0.35)]"
              >
                <Cover
                  accent={frontmatter.accent}
                  glyph={frontmatter.glyph}
                  index={frontmatter.order ?? i + 1}
                  category={frontmatter.category}
                />
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="chip"
                      style={{ color: frontmatter.accent }}
                    >
                      <span className="dot" />
                      {frontmatter.category}
                    </span>
                    <span className="font-mono text-[11px] text-faint">
                      {frontmatter.readingTime}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-ink">
                    {frontmatter.title}
                  </h3>
                  <p className="mt-2 font-serif text-lg leading-snug text-inksoft">
                    {frontmatter.dek}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Read the note{' '}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Index ────────────────────────────────────────────── */}
      <section className="pb-8">
        <div className="mb-2 flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="eyebrow">The index — every experiment</h2>
          <span className="font-mono text-[11px] text-faint">
            {String(count).padStart(2, '0')}
          </span>
        </div>

        <ul>
          {posts.map(({ slug, frontmatter }: any, i: number) => (
            <li key={slug} className="row-rule">
              <Link
                href={`/post/${slug}`}
                className="row-link group flex items-center gap-4 rounded-lg px-2 py-5 sm:gap-6 sm:px-4"
              >
                <span className="font-mono text-xs text-faint">
                  {String(frontmatter.order ?? i + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden
                  className="hidden h-10 w-10 flex-none items-center justify-center rounded-lg text-xl sm:flex"
                  style={{
                    background: `${frontmatter.accent}14`,
                    color: frontmatter.accent,
                  }}
                >
                  {frontmatter.glyph}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-lg font-semibold tracking-tight text-ink">
                      {frontmatter.title}
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.14em]"
                      style={{ color: frontmatter.accent }}
                    >
                      {frontmatter.category}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate font-serif text-base text-muted">
                    {frontmatter.dek}
                  </span>
                </span>
                <span className="hidden flex-none font-mono text-[11px] text-faint sm:block">
                  {frontmatter.readingTime}
                </span>
                <span className="flex-none font-mono text-muted transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
