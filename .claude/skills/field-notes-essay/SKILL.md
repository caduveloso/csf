---
name: field-notes-essay
description: >
  Turn the current project into a new essay for Cadu's "Field Notes" portfolio
  (the caduveloso/csf repo). Use when the user says things like "write a Field
  Note", "add this to my portfolio", "make an essay about this project/experiment",
  "publish a field note", or "document this as a blog post for my site". Reads the
  current repo's docs and code, drafts an educative, idea-level essay in the Field
  Notes voice with correct front-matter, optionally generates a cover image or
  short video, and publishes it as a new post on a branch in the portfolio repo.
---

# Field Notes — new essay

This skill creates one new essay in the **Field Notes** portfolio from whatever
project it is invoked in. Field Notes is an educative journal of AI experiments:
each post explains *an idea* — the problem, the architecture, what broke, and the
reusable pattern — not a feature list and not marketing.

Work in this order. Read the linked reference files **only when you reach that
step** (progressive disclosure — don't load them all up front).

## 1 · Locate the portfolio repo

The post must land in the portfolio (`caduveloso/csf`), which is usually a
*different* repo than the one you're invoked in. Resolve it:

```bash
PORTFOLIO="$(bash "$SKILL_DIR/scripts/locate-portfolio.sh")"
echo "$PORTFOLIO"
```

`$SKILL_DIR` is this skill's directory. The script checks `$CADU_PORTFOLIO`, then
common local paths, then clones `caduveloso/csf` to a temp dir as a fallback. If it
clones, tell the user where, since the push will create a branch on the remote.

## 2 · Gather the raw material from the current project

Build understanding of *this* repo (not the portfolio):

- `README.md`, `docs/**`, `CHANGELOG`, design notes, ADRs.
- `package.json` / language manifest → name, stack, scripts.
- A few key source files and recent `git log --oneline -20` for what actually happened.

Then find the **angle** — the one interesting AI/engineering idea worth teaching.
If it isn't obvious, ask the user 1–3 sharp questions before writing:
- What's the genuinely interesting idea or pattern here?
- What broke or surprised you? (honesty is the voice)
- What's the reusable takeaway someone should steal?

**Never fabricate metrics, benchmarks, quotes, or results.** Write at the level of
approach, architecture, and pattern. If you don't know a number, don't invent one.

## 3 · Assign metadata and the next slot

Read `reference/post-schema.md` for the full front-matter spec, the
category→accent map, and the used-glyph list. Then compute the next index:

```bash
eval "$(bash "$SKILL_DIR/scripts/next-index.sh" "$PORTFOLIO")"   # sets NN and ORDER
```

Pick a `category` + matching `accent`, a fresh `glyph` (not already used), set
`date` to today, estimate `readingTime` (~200 wpm), `featured: false` by default,
`order: $ORDER`. The filename is `posts/<NN>-<slug>.md`.

## 4 · Draft the essay

Read `reference/voice-and-structure.md` and `assets/post-template.md`. Write
~700–1100 words following that structure: a drop-cap `<p class="lead">` opener that
frames a tension, `##` sections, exactly one `callout` for the core idea, a code
block or ASCII diagram where it clarifies, an honest "what broke" beat, and a
reusable-pattern close. Match the existing posts' register: confident, humble,
educative, no hype.

## 5 · Media — only if it earns its place

Read `reference/media.md`. The site gives every post a **generated cover for
free**, so a post needs *no* image to look finished. Add media only when a figure,
diagram, screenshot, or short clip genuinely helps the reader. If you do, place
assets under the portfolio's `public/images/<slug>/` or `public/videos/<slug>/` and
embed them per that reference. Use whatever image/video generation tools are
available in the session; if none are, ask the user for an asset or skip it.

## 6 · Write, validate, publish

1. Write the post file into `$PORTFOLIO/posts/<NN>-<slug>.md` (and any assets).
2. Validate the portfolio still builds:
   ```bash
   (cd "$PORTFOLIO" && npm install --silent && npm run build) 2>&1 | tail -5
   ```
3. Publish on a branch (never commit straight to `main`):
   ```bash
   bash "$SKILL_DIR/scripts/publish-essay.sh" "$PORTFOLIO" "<NN>-<slug>"
   ```
   This stages, commits, and pushes `essay/<slug>`. **Ask the user before opening a
   pull request** — don't open one automatically.

Report back with the slug, the branch, the category/accent/glyph chosen, and the
local preview command (`cd "$PORTFOLIO" && npm run dev`).

## Notes

- Keep `featured` essays to ≤ 3 total; only feature on explicit request.
- One essay per invocation. If the project contains several distinct ideas, propose
  the strongest and offer the others as follow-ups.
- This skill is self-contained: the reference files carry every Field Notes
  convention, so it works even when the portfolio repo isn't checked out yet.
