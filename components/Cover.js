// A generated cover: no raster images, just a designed field built from the
// post's accent colour, glyph and index. Keeps the whole journal self-contained
// and gives every experiment a consistent, intentional visual identity.
export default function Cover({
  accent = '#5b4fe9',
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
        background: `radial-gradient(120% 140% at 18% 0%, ${accent}26 0%, transparent 55%), radial-gradient(120% 120% at 100% 100%, ${accent}1f 0%, transparent 50%), #15151b`,
      }}
    >
      <div className="cover-grid" />

      {/* big faint glyph */}
      <span
        aria-hidden
        className="select-none leading-none"
        style={{
          fontSize: tall ? '12rem' : '5.5rem',
          color: accent,
          opacity: 0.92,
          textShadow: `0 0 60px ${accent}66`,
        }}
      >
        {glyph}
      </span>

      {/* corner index */}
      <span
        className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.2em]"
        style={{ color: `${accent}` }}
      >
        №{idx}
      </span>

      {/* corner category */}
      {category ? (
        <span className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
          {category}
        </span>
      ) : null}
    </div>
  );
}
