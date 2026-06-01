# Media: images & video

**Default to none.** Every post gets a generated cover (built from `accent` +
`glyph`) automatically, so a text-only essay already looks finished and on-brand.
Add media only when it does real work for the reader: a system diagram, a before/
after, a screenshot of the actual artifact, or a short clip of something in motion.

## Where assets live

Inside the portfolio repo:

```
public/images/<slug>/figure-1.png      # diagrams, screenshots, stills
public/videos/<slug>/demo.mp4          # short clips (keep < ~10 MB, muted-friendly)
```

Use the post's own slug as the folder so assets stay scoped and easy to prune.

## How to embed

The post renderer runs `markdown-it` with `html: true`, so both Markdown and raw
HTML work.

**Image** (Markdown) — gets rounded corners + a hairline border from the prose CSS:

```md
![Pipeline: audio → MIDI → notation](/images/05-from-audio-to-notation/pipeline.png)
<p class="caption">The five-stage chain, each step discarding a kind of ambiguity.</p>
```

**Video** (raw HTML) — self-hosted clip:

```html
<video controls muted playsinline preload="metadata"
  style="width:100%;border-radius:12px;border:1px solid var(--line)"
  src="/videos/<slug>/demo.mp4"></video>
<p class="caption">10-second capture of the agent revising a layout.</p>
```

**Embedded video** (YouTube/Vimeo) — wrap for a responsive 16:9:

```html
<div style="position:relative;padding-top:56.25%;border-radius:12px;overflow:hidden;border:1px solid var(--line)">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="…" allowfullscreen
    style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>
</div>
```

Always add a `<p class="caption">` under a figure — it's styled in mono small.

## Generating assets

Use whatever generation tools the session offers, then download the result into the
folders above:

- **Image-generation MCP** (e.g. an Adobe Firefly / Express server, or any
  text-to-image tool) — generate diagrams, covers, or stylized stills, then save
  the returned file into `public/images/<slug>/`.
- **Diagrams** — a clean SVG or a rendered Mermaid/Excalidraw export works well and
  stays crisp; an ASCII diagram inside a code block is often enough and needs no
  asset at all.
- **Video** — a screen capture of the real thing beats anything synthetic. Trim it
  short, strip audio if it doesn't add anything, and keep the file small.

If no generation tool is available and the user has no asset to hand, **skip the
media** and rely on the generated cover rather than shipping a broken image path.

## Hygiene

- Optimize before committing (compress PNG/JPEG, transcode video to H.264 MP4).
- Reference assets with absolute paths from `public` (`/images/...`, `/videos/...`).
- Never hot-link external images into the body — download and self-host so the post
  doesn't rot.
- Verify the path resolves: after writing, the file must exist under
  `public/<the path you referenced>`.
