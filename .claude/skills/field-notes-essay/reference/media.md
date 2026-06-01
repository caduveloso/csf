# Media: diagrams, illustrations, video & images

**Default to none.** Every post gets a generated cover (built from `accent` +
`glyph`) automatically, so a text-only essay already looks finished and on-brand.
Add visuals only when they do real work for the reader.

When you *do* add a visual, the house style — in order of preference — is:

1. **Inline SVG diagrams & line-art illustrations** (no asset files, crisp, themed,
   and they animate for free). This is the signature look.
2. **A scrollytelling block** — a sticky figure that lights up step-by-step as the
   reader scrolls. Use it for anything with stages/phases.
3. **Self-hosted video** — a short screen capture of the real thing.
4. **Raster images** — screenshots or generated stills, only when SVG won't do.

## The renderer & two hard rules

The post body is rendered with `markdown-it` (`html: true`), so raw HTML and inline
SVG pass straight through. Two rules keep it from breaking:

- **No blank lines inside an HTML block.** A blank line ends the raw-HTML block and
  markdown parsing resumes mid-figure. Keep each `<div>…</div>` / `<svg>…</svg>`
  contiguous (newlines are fine, *empty* lines are not). Put one blank line *before*
  and *after* the whole block.
- **Wrap figures in `<div>`, not `<figure>`.** `markdown-it` reliably treats `div`
  as a block tag; `figure` is not on its list and can mis-parse. Use
  `<div class="figure-block">` and `<div class="caption">`.

## Theme tokens & diagram classes (use these — never hard-code colours)

CSS variables available in any inline style: `--accent`, `--ink`, `--ink-soft`,
`--muted`, `--line`, `--line-strong`, `--card`, `--paper`.

SVG helper classes (give `.diagram` to the `<svg>`):

| class           | effect                                   |
|-----------------|------------------------------------------|
| `d-stroke`      | ink stroke, no fill, 1.5px               |
| `d-accent`      | recolour stroke to the post accent       |
| `d-soft`        | faint hairline stroke                    |
| `d-fill-accent` | fill in the accent colour                |
| `d-label`       | 13px medium sans label text              |
| `d-sub`         | 11px muted sans sub-label                |

## 1 · Inline SVG diagram / illustration

Wrap in `<div class="figure-block draw">`. The `draw` class makes any element
marked `data-draw` (with `pathLength="1"`) *line-draw itself* when it scrolls into
view. Filled shapes just fade in with the figure.

```html
<div class="figure-block draw">
<svg class="diagram" viewBox="0 0 640 160" role="img" aria-label="What it shows">
<rect x="8" y="40" width="150" height="56" rx="12" class="d-stroke d-soft"/>
<text class="d-label" x="83" y="66" text-anchor="middle">Stage</text>
<text class="d-sub"   x="83" y="84" text-anchor="middle">subtitle</text>
<line data-draw pathLength="1" x1="160" y1="68" x2="210" y2="68" class="d-stroke d-accent"/>
</svg>
<div class="caption">One line on what the reader is looking at.</div>
</div>
```

Keep diagrams minimal line-art: a few boxes, arrows, a waveform, a small chart.
`viewBox` scales to the column width. For arrowheads, define a `<marker>` in
`<defs>` and reference it with `marker-end`.

## 2 · Scrollytelling (sticky figure + stepped text)

A `.scrolly` block has one `.scrolly-figure` (sticky) and a `.scrolly-steps` list.
Each `.scrolly-step` carries `data-step="N"`; as it enters view the figure gets
`data-active="N"`, and SVG groups marked `data-part="N"` light up (others dim).
Steps 1–5 are supported. **Wrap each step's prose in `<p>`** (the steps are flex
columns; bare inline text/`<em>` would break onto its own line).

```html
<div class="scrolly">
<div class="scrolly-figure" data-active="1">
<svg class="diagram" viewBox="0 0 400 200" role="img" aria-label="Stages">
<g data-part="1"><rect x="8" y="8" width="384" height="80" rx="14" class="d-stroke d-soft"/><text class="d-label" x="28" y="44">01 · First</text></g>
<g data-part="2"><rect x="8" y="100" width="384" height="80" rx="14" class="d-stroke d-accent"/><text class="d-label" x="28" y="136">02 · Second</text></g>
</svg>
</div>
<div class="scrolly-steps">
<div class="scrolly-step active" data-step="1"><span class="n">Stage 01 — First</span><p>What happens in stage one, and why it matters.</p></div>
<div class="scrolly-step" data-step="2"><span class="n">Stage 02 — Second</span><p>What happens in stage two.</p></div>
</div>
</div>
```

It breaks out wider than the text column on its own and stacks on mobile — no extra
work needed. See `posts/05-from-audio-to-notation.md` for a complete, working
example to copy.

## 3 · Video (self-hosted or embedded)

Store clips under `public/videos/<slug>/` (keep < ~10 MB, H.264 MP4, muted-friendly).

```html
<div class="figure-block">
<video controls muted playsinline preload="metadata" style="width:100%;border-radius:12px;border:1px solid var(--line)" src="/videos/<slug>/demo.mp4"></video>
<div class="caption">10-second capture of the agent revising a layout.</div>
</div>
```

Embedded (YouTube/Vimeo), responsive 16:9 — keep it on contiguous lines:

```html
<div class="figure-block">
<div style="position:relative;padding-top:56.25%;border-radius:12px;overflow:hidden;border:1px solid var(--line)"><iframe src="https://www.youtube.com/embed/VIDEO_ID" title="…" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>
<div class="caption">Caption.</div>
</div>
```

## 4 · Raster images (screenshots / generated stills)

Store under `public/images/<slug>/`. Markdown images get rounded corners + a
hairline from the prose CSS:

```md
![Alt text describing the picture](/images/<slug>/figure-1.png)
```

Generate with whatever tools the session offers (an image-gen MCP, a screenshot, a
Mermaid/Excalidraw export), then save into the folder above. **Prefer an inline SVG
diagram to a generated raster** — it stays crisp, matches the theme, and animates.
If no tool is available and the user has no asset, **skip the visual** rather than
ship a broken path.

## Hygiene

- Reference assets with absolute paths from `public` (`/images/...`, `/videos/...`)
  and verify the file actually exists there after writing.
- Optimize before committing (compress PNG/JPEG, transcode video to H.264 MP4).
- Never hot-link external images into the body — download and self-host.
- Recolour visuals with the theme tokens/classes above; never paste in a stray hex.
