# Voice & structure

Field Notes is a *journal of AI experiments*, written to be **educative** — useful
to copy, not just admired. Each essay teaches one idea. Read two or three existing
posts in `posts/` before writing to calibrate; this file is the summary.

## The voice

- **Idea-first, honest, humble-confident.** You're a designer-engineer sharing what
  you learned, including what broke. Never breathless, never a sales pitch.
- **Concrete over abstract.** Name the real tension. Show the actual move. Prefer
  "the model proposes, the runtime disposes" to "leveraging AI synergies".
- **No invented evidence.** No fabricated metrics, benchmarks, quotes, dates, or
  user counts. Claims stay at the level of approach, architecture, and pattern.
- **Educative generosity.** The reader should leave able to *reuse the pattern* in
  their own work. End on the transferable lesson.
- **British-leaning em-dashes and the occasional second person.** Tight, literary,
  but technical. ~700–1100 words.

## The structure (follow this rhythm)

1. **Lead with a tension** — the first paragraph is wrapped in
   `<p class="lead"> … </p>`. It's a quiet, slightly-larger intro (no drop cap, no
   ornament), so open with a vivid, specific framing of the problem or the
   surprise. No throat-clearing, no "In this essay".

2. **2–5 `##` sections**, each a real step in the thinking. Headings are short and
   declarative ("The agent's keyboard: scripting, not clicking") and set in the
   display serif (Fraunces) — keep them plain; the type does the work.

3. **Exactly one `callout`** carrying the single most important idea:
   ```html
   <div class="callout">
   <span class="label">The core idea</span>
   Don't ask the model to <strong>render</strong> — ask it to <strong>specify</strong>.
   </div>
   ```
   Use a short label like `The core idea`, `Principle`, `Lesson from the trenches`,
   `The reframe`. One per post — it's the line you want remembered.

4. **A code block or ASCII diagram** where it genuinely clarifies — a tiny API
   sketch, a pipeline, a state machine. Fenced with a language. Keep it small and
   illustrative, not real production code.

5. **An honest "what broke" beat** — a short list or section of the failure modes
   and what each taught you. This is the signature of the voice; never skip it.

6. **A reusable-pattern close** — zoom out to the transferable principle. "Nothing
   here is really about documents…" Tell the reader what to steal.

## The look (so your words land right)

The site is **warm, minimal, editorial**: off-white paper, warm ink, a single clay
accent. Type is a **serif mix** — Fraunces (display) for titles/headings, Newsreader
(serif) for body, a small sans for labels, mono only for code. Write for that
register: calm, literary, unhurried. The page already carries tasteful scroll
motion (headings, figures, callouts and diagrams fade in; SVG diagrams draw
themselves) — you don't add motion, you just author the blocks.

## Devices you can use

- `> blockquote` for a single resonant line.
- `**bold**` for the load-bearing phrase in a sentence; `inline code` for tokens,
  flags, and identifiers.
- `---` for a section break (renders as a centered asterism).
- Numbered lists for sequenced lessons; bullet lists for parallel points.
- **Inline SVG diagrams, illustrations and a scrollytelling block** for visual
  experiments — the preferred way to add a picture here (see `media.md`). A
  minimal line-art diagram or an animated step-through often beats a screenshot.
- `<p class="caption">…</p>` (or `<div class="caption">`) under a figure.

## Anti-patterns (avoid)

- Feature dumps ("It supports X, Y, and Z").
- Hype words: "revolutionary", "seamless", "powerful", "cutting-edge".
- Vague endings ("the possibilities are endless").
- Walls of code. The essay is prose with code *in service of* the prose.
- Claiming outcomes you can't support. When unsure, describe the approach, not a
  result.
