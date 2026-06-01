import fs from 'fs';
import matter from 'gray-matter';
import markdownIt from 'markdown-it';
import Link from 'next/link';
import Cover from '../../components/Cover';

const md = markdownIt({ html: true, linkify: true, typographer: true });

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files
    .filter((f) => f.endsWith('.md'))
    .map((fileName) => ({ params: { slug: fileName.replace('.md', '') } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);

  // build an ordered list so we can link to the next experiment
  const all = fs
    .readdirSync('posts')
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = matter(fs.readFileSync(`posts/${f}`, 'utf-8')).data;
      return {
        slug: f.replace('.md', ''),
        title: fm.title || '',
        order: fm.order ?? 99,
        accent: fm.accent || '#5b4fe9',
        glyph: fm.glyph || '✳',
        category: fm.category || '',
      };
    })
    .sort((a, b) => a.order - b.order);

  const i = all.findIndex((p) => p.slug === slug);
  const next = all[(i + 1) % all.length] || null;

  return { props: { frontmatter, content, next } };
}

export default function PostPage({ frontmatter, content, next }) {
  const stack = frontmatter.stack || [];
  const tags = frontmatter.tags || [];

  return (
    <article>
      {/* ── Hero band ──────────────────────────────────────── */}
      <div className="border-b border-line bg-paper2">
        <div className="mx-auto max-w-page px-5 pt-8 sm:px-8">
          <Link
            href="/"
            className="link-underline font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-ink"
          >
            ← Field Notes / Index
          </Link>
        </div>

        <div className="mx-auto grid max-w-page items-end gap-8 px-5 pb-12 pt-8 sm:px-8 md:grid-cols-[1fr_300px]">
          <div>
            <div className="flex items-center gap-3">
              <span className="chip" style={{ color: frontmatter.accent }}>
                <span className="dot" />
                {frontmatter.category}
              </span>
              <span className="font-mono text-[11px] text-muted">
                {frontmatter.readingTime}
              </span>
            </div>

            <h1 className="display mt-5 max-w-3xl text-[2.2rem] leading-[1.05] text-ink sm:text-5xl">
              {frontmatter.title}
            </h1>

            {frontmatter.dek && (
              <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-inksoft">
                {frontmatter.dek}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              {frontmatter.date && <span>{frontmatter.date}</span>}
              {frontmatter.repo && (
                <>
                  <span className="text-faint">/</span>
                  <span>repo · {frontmatter.repo}</span>
                </>
              )}
              {stack.length > 0 && (
                <>
                  <span className="text-faint">/</span>
                  <span className="normal-case tracking-normal">
                    {stack.join(' · ')}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-line md:block">
            <div className="h-[200px]">
              <Cover
                accent={frontmatter.accent}
                glyph={frontmatter.glyph}
                index={frontmatter.order}
                category={frontmatter.category}
                size="hero"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-page px-5 py-14 sm:px-8">
        <div
          className="prose-editorial mx-auto"
          dangerouslySetInnerHTML={{ __html: md.render(content) }}
        />

        {/* tags */}
        {tags.length > 0 && (
          <div className="mx-auto mt-14 flex max-w-prose flex-wrap gap-2 border-t border-line pt-8">
            {tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* next experiment */}
        {next && (
          <Link
            href={`/post/${next.slug}`}
            className="group mx-auto mt-10 flex max-w-prose items-center gap-4 rounded-2xl border border-line bg-card p-5 transition-shadow hover:shadow-[0_18px_50px_-22px_rgba(20,20,30,0.3)]"
          >
            <span
              aria-hidden
              className="flex h-12 w-12 flex-none items-center justify-center rounded-xl text-2xl"
              style={{ background: `${next.accent}14`, color: next.accent }}
            >
              {next.glyph}
            </span>
            <span className="min-w-0 flex-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Next experiment
              </span>
              <span className="mt-1 block truncate text-lg font-semibold tracking-tight text-ink">
                {next.title}
              </span>
            </span>
            <span className="flex-none font-mono text-muted transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
