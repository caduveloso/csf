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
        <p className="eyebrow" data-reveal>
          Cadu Veloso · A journal of AI experiments
        </p>
        <h1
          className="display mt-6 max-w-4xl text-[2.7rem] leading-[1.05] text-ink sm:text-[4.2rem]"
          data-reveal
          data-reveal-delay="80"
        >
          Field notes on teaching{' '}
          <em className="not-italic text-accent">machines to make things</em> —
          documents, music, software.
        </h1>
        <p
          className="mt-8 max-w-2xl font-text text-xl leading-relaxed text-inksoft"
          data-reveal
          data-reveal-delay="160"
        >
          I&apos;m a designer-engineer. For the last stretch I&apos;ve been
          building with agents: handing them real tools — page-layout software,
          audio, codebases, browsers — and studying where they shine, where they
          break, and the patterns that make them dependable. This is the lab
          notebook. Each entry is one experiment, written to be{' '}
          <em>useful to copy</em>, not just admired.
        </p>
        <div
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium text-muted"
          data-reveal
          data-reveal-delay="240"
        >
          <span>{count} experiments</span>
          <span className="text-faint">·</span>
          <span>Agentic design · Audio · Infrastructure</span>
          <span className="text-faint">·</span>
          <span>Updated 2026</span>
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-14">
          <div className="mb-7 flex items-baseline justify-between" data-reveal>
            <h2 className="eyebrow">Selected</h2>
          </div>
          <div className="grid gap-7 md:grid-cols-2">
            {featured.map(({ slug, frontmatter }: any, i: number) => (
              <Link
                key={slug}
                href={`/post/${slug}`}
                data-reveal
                data-reveal-delay={i * 90}
                className="group block overflow-hidden rounded-2xl border border-line bg-card transition-shadow hover:shadow-[0_18px_50px_-26px_rgba(33,31,26,0.4)]"
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
                    <span className="text-[12px] text-faint">
                      {frontmatter.readingTime}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.7rem] font-medium leading-tight tracking-tight text-ink">
                    {frontmatter.title}
                  </h3>
                  <p className="mt-2 font-text text-lg leading-snug text-inksoft">
                    {frontmatter.dek}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold"
                    style={{ color: frontmatter.accent }}
                  >
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
        <div
          className="mb-2 flex items-baseline justify-between border-b border-line pb-4"
          data-reveal
        >
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
                data-reveal
                data-reveal-delay={Math.min(i * 45, 360)}
                className="row-link group flex items-center gap-4 rounded-lg px-2 py-5 sm:gap-6 sm:px-4"
              >
                <span className="font-mono text-xs text-faint">
                  {String(frontmatter.order ?? i + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden
                  className="hidden h-11 w-11 flex-none items-center justify-center rounded-xl font-display text-xl sm:flex"
                  style={{
                    background: `${frontmatter.accent}12`,
                    color: frontmatter.accent,
                  }}
                >
                  {frontmatter.glyph}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-display text-lg font-medium tracking-tight text-ink">
                      {frontmatter.title}
                    </span>
                    <span
                      className="text-[11px] font-medium uppercase tracking-[0.1em]"
                      style={{ color: frontmatter.accent }}
                    >
                      {frontmatter.category}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate font-text text-base text-muted">
                    {frontmatter.dek}
                  </span>
                </span>
                <span className="hidden flex-none text-[12px] text-faint sm:block">
                  {frontmatter.readingTime}
                </span>
                <span className="flex-none text-muted transition-transform group-hover:translate-x-1">
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
