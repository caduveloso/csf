// Generated cover — light, warm, minimal. No raster images: a quiet dotted
// field, a large serif glyph in the post's accent, and a small index.
export default function Cover({
  accent = '#b65b3c',
  glyph = '✳',
  index = 1,
  category = '',
  size = 'card',
}) {
  const tall = size === 'hero';
  const idx = String(index).padStart(2, '0');

  return (
    <div
      className={`cover-field flex items-center justify-center ${
        tall ? 'h-full' : 'aspect-[16/10]'
      }`}
      style={{
        background: `radial-gradient(130% 130% at 20% 0%, ${accent}14 0%, transparent 60%), var(--card)`,
      }}
    >
      <div className="cover-dots" />

      <span
        aria-hidden
        className="select-none font-display leading-none"
        style={{
          fontSize: tall ? '9rem' : '4.6rem',
          color: accent,
          opacity: 0.9,
        }}
      >
        {glyph}
      </span>

      <span
        className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.18em]"
        style={{ color: accent }}
      >
        №{idx}
      </span>

      {category ? (
        <span className="eyebrow absolute bottom-4 right-4 !text-[10px]">
          {category}
        </span>
      ) : null}
    </div>
  );
}
