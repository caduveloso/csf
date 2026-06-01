# Field Notes — Cadu Veloso

A working journal of experiments in **agentic design, audio, and software**. Not a
traditional portfolio: each entry is one experiment, written to be educative — the
idea, the architecture, what broke, and the pattern worth reusing.

Built with Next.js (pages router), Tailwind, and a small custom prose design system.

## Selected experiments

- **Teaching an Agent to Operate InDesign** — driving professional page-layout
  software with a model, constrained by a design system.
- **Agentic QA** — a second agent that renders the artifact, judges it against a
  rubric, and sends it back to be fixed.
- **Mink** — a mission-control CLI for running a fleet of repos from one panel.
- **A Design System for Machine-Written Prose** — treating AI output as a
  first-class typographic problem (this site's own prose system).
- ...and more across audio-to-notation, knowledge avatars, document
  intelligence, agent-readable task boards, and shipping on-chain solo.

## Structure

```
pages/
  index.tsx          # editorial home: hero + featured + numbered index
  post/[slug].js     # article layout wrapping the prose design system
components/
  Navbar / Footer / Layout
  Cover.js           # generated, image-free cover art per experiment
posts/*.md           # one Markdown file per experiment (front-matter driven)
styles/globals.css   # the design system: type, tokens, prose-editorial
```

Each post is a Markdown file with front-matter: `title`, `dek`, `category`,
`accent`, `glyph`, `repo`, `stack`, `readingTime`, `featured`, `order`, `tags`.
Covers are generated from `accent` + `glyph` — no image assets required.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (statically generates every experiment)
```

## Adding an experiment

Drop a new `posts/NN-slug.md` file with the front-matter above. It appears in the
index automatically, ordered by `order`, and gets its own statically generated page.
