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
accent: "#2563eb"                        # hex; must match the category (see map)
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

Reuse an existing category when it fits. Each has a primary accent; the listed
variants are fine when you want sibling posts to differ slightly.

| Category               | Primary accent | Variants used        | Feel                         |
|------------------------|----------------|----------------------|------------------------------|
| Agentic Design         | `#7c3aed`      | `#4f46e5`            | agents producing design/docs |
| Agent Infrastructure   | `#2563eb`      | `#0284c7`, `#4338ca` | tooling, orchestration, RAG  |
| Craft                  | `#0d9488`      | —                    | typography, taste, systems   |
| Audio & Music          | `#d97706`      | `#ea580c`            | sound, MIDI, notation        |
| Document Intelligence  | `#059669`      | —                    | extraction, scraping, OCR    |
| Shipping               | `#e11d48`      | —                    | end-to-end builds, web3      |

If a genuinely new theme appears, you may add a category — pick a distinct,
tasteful accent (Tailwind 600-level colors work well) and stay consistent.

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
