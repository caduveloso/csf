# Post schema & metadata

Every essay is one Markdown file at `posts/<NN>-<slug>.md` where `<NN>` is a
zero-padded index and `<slug>` is kebab-case. The index page reads the front-matter
and sorts by `order`; covers are generated from `accent` + `glyph`, so **no image
is required** for a post to look finished.

## Front-matter (all fields)

```yaml
---
title: "Title Case, a Real Sentence Not a Slogan"
dek: "One sentence — the promise of the piece. Shown under the title and in the index."
category: "Agent Infrastructure"        # must be one of the categories below
date: "2026-06-01"                       # YYYY-MM-DD, today
accent: "#54667a"                        # hex; must match the category (see map)
glyph: "⌘"                               # one unicode symbol, not already used
repo: "mink-3000-cli"                    # source repo name, shown as a label (not a link)
stack: ["TypeScript", "CLI", "Agents"]   # 2–5 short tokens
readingTime: "6 min read"                # estimate at ~200 wpm
featured: false                          # true only on explicit request; keep ≤ 3 total
order: 11                                 # next integer = max existing + 1
tags:
  - agents
  - developer-tools
---
```

`next-index.sh` prints the correct `NN` and `ORDER`. They should be the same number.

## Categories → accent

The palette is **warm and muted** (earth tones — no electric/neon colors, no
purple). Reuse an existing category when it fits. Each has a primary accent; the
listed variants are fine when you want sibling posts to differ slightly.

| Category               | Primary accent | Variants used        | Feel                         |
|------------------------|----------------|----------------------|------------------------------|
| Agentic Design         | `#b65b3c` clay | `#9c4e34`            | agents producing design/docs |
| Agent Infrastructure   | `#54667a` slate| `#5d7088`, `#4f6072` | tooling, orchestration, RAG  |
| Craft                  | `#2f6e63` pine | —                    | typography, taste, systems   |
| Audio & Music          | `#b5832e` ochre| `#a96a25`            | sound, MIDI, notation        |
| Document Intelligence  | `#5c7355` sage | —                    | extraction, scraping, OCR    |
| Shipping               | `#9e4b43` brick| —                    | end-to-end builds, web3      |

`#b65b3c` (clay) is the site's primary accent. If a genuinely new theme appears,
you may add a category — pick a **muted, earthy** tone that sits next to these
(think clay, ochre, sage, slate, pine, terracotta — desaturated, warm). Avoid
bright or saturated hues; they fight the warm-paper aesthetic.

## Glyphs already in use (pick a different one)

`❖`  `⊚`  `⌘`  `¶`  `♪`  `∿`  `◍`  `▤`  `▦`  `◈`

Good unused candidates: `◆ ✦ ❂ ⟁ ⌬ ◉ ✸ ⊛ ⎔ ☍ ∴ ⧉ ▣ ⌗ ✺ ◭ ⟡ ⊞`. Choose one that
loosely evokes the topic. It renders large and faint on the generated cover, so
prefer bold, geometric, single-width symbols (avoid emoji and combining marks).

## Rules of thumb

- `dek` is one sentence, no period-stuffing, no "In this post we will…".
- `repo` is the source project's repo name as plain text (portfolio repos are
  private, so do **not** turn it into a dead link).
- New posts append at the end (`featured: false`) unless the user asks to feature.
- Slug ≈ a shortened, memorable version of the title (e.g.
  `mink-mission-control-for-repos`).
