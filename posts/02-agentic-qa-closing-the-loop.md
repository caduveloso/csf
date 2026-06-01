---
title: "Agentic QA: Closing the Loop on Generated Design"
dek: "Generation is the easy half. The interesting work is a second agent that looks at the result, compares it to the spec, and sends it back to be fixed."
category: "Agentic Design"
date: "2026-05-18"
accent: "#9c4e34"
glyph: "⊚"
repo: "design-system"
stack: ["TypeScript", "Vision models", "PDF render", "Rubrics"]
readingTime: "6 min read"
featured: false
order: 2
tags:
  - agents
  - quality-assurance
  - vision
  - feedback-loops
---

<p class="lead">A generator with no critic is a slot machine. It produces something, you look at it, and you either get lucky or you pull the lever again. The thing that turns a slot machine into a tool is a feedback loop — a second agent whose entire job is to look at the output, judge it honestly, and decide whether it goes back for another pass.</p>

<div class="figure-block draw">
<svg class="diagram" viewBox="0 0 460 300" role="img" aria-label="The QA loop: generate, render, review, fix">
<defs><marker id="qa" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" class="d-stroke d-accent" fill="none"/></marker></defs>
<path data-draw pathLength="1" d="M230,42 A108,108 0 0 1 338,150" class="d-stroke d-accent" fill="none" marker-end="url(#qa)"/>
<path data-draw pathLength="1" d="M338,150 A108,108 0 0 1 230,258" class="d-stroke d-accent" fill="none" marker-end="url(#qa)"/>
<path data-draw pathLength="1" d="M230,258 A108,108 0 0 1 122,150" class="d-stroke d-accent" fill="none" marker-end="url(#qa)"/>
<path data-draw pathLength="1" d="M122,150 A108,108 0 0 1 230,42" class="d-stroke d-accent" fill="none" marker-end="url(#qa)"/>
<g><rect x="175" y="24" width="110" height="38" rx="10" class="d-stroke d-soft d-fill-card"/><text class="d-label" x="230" y="48" text-anchor="middle">Generate</text></g>
<g><rect x="300" y="131" width="104" height="38" rx="10" class="d-stroke d-soft d-fill-card"/><text class="d-label" x="352" y="155" text-anchor="middle">Render</text></g>
<g><rect x="175" y="238" width="110" height="38" rx="10" class="d-stroke d-soft d-fill-card"/><text class="d-label" x="230" y="262" text-anchor="middle">Review</text></g>
<g><rect x="56" y="131" width="104" height="38" rx="10" class="d-stroke d-accent d-fill-card"/><text class="d-label" x="108" y="155" text-anchor="middle">Fix</text></g>
<text class="d-sub" x="230" y="148" text-anchor="middle">judge the rendered</text>
<text class="d-sub" x="230" y="164" text-anchor="middle">artifact, not the source</text>
</svg>
<div class="caption">The loop runs until the verdict is <em>pass</em> — or a budget trips. The critic reviews what a person would actually see.</div>
</div>
<div class="checklist">
<div class="ci pass"><span class="mark">✓</span>Every heading maps to an approved type style</div>
<div class="ci pass"><span class="mark">✓</span>Body text sits on the baseline grid</div>
<div class="ci pass"><span class="mark">✓</span>Margins &amp; gutters within the spacing scale</div>
<div class="ci fail"><span class="mark">✕</span>Page 4 caption overflows its frame — shorten to ≤ 1 line</div>
<div class="ci pass"><span class="mark">✓</span>Palette stays inside the defined set</div>
</div>

This experiment grew directly out of the InDesign work. Once an agent could *make* a document, the obvious next question was: how do you know it's any good — without a human reviewing every page?

## The loop

The shape is borrowed from how a studio actually works: someone produces, someone reviews, notes come back, the producer revises. Encoded as agents, it looks like this:

```text
brief ─▶ [GENERATOR] ─▶ artifact ─▶ render to image
                                        │
                                        ▼
                                   [REVIEWER]
                                  rubric + vision
                                        │
                 pass ◀───────── verdict ───────▶ fail + notes
                  │                                     │
                  ▼                                     ▼
                ship                          back to GENERATOR
```

The unlock is the *render-to-image* step. You cannot review a layout from its source — the source can be flawless and the page can still be a mess. So the artifact is rendered to a real image, and the reviewer looks at the **same thing a person would see**.

<div class="callout">
<span class="label">Principle</span>
Review the <strong>rendered reality</strong>, not the source of truth. The map is not the territory; check the territory. A vision model reading a screenshot catches things — collisions, awkward spacing, a cover that just feels off — that no amount of inspecting the markup will reveal.
</div>

## Vibes don't reproduce — rubrics do

The trap in any AI critic is vagueness. Ask "does this look good?" and you get a different answer every run, none of them actionable. The reviewer has to be anchored to something stable, and that anchor is the **design system again** — now used as a rubric.

Because every element was generated from named tokens, the reviewer can check concrete, falsifiable things:

- Does every heading map to an approved type style, or did a rogue size sneak in?
- Is the body text on the baseline grid?
- Are margins and gutters within the system's spacing scale?
- Any overset text, frame collisions, or empty frames?
- Does the colour palette stay inside the defined set?

Each becomes a line item with a pass/fail and, on fail, a *specific note*: "Page 4 caption overflows its frame; shorten or enlarge frame to grid." Vague taste becomes a checklist. The same input produces the same critique. That reproducibility is the whole game — it's what separates QA from a second opinion.

## Notes the generator can actually use

A critic that says "make it better" is useless; the generator has nowhere to go. The reviewer's output is therefore structured to be *consumed*, not read:

```json
{
  "verdict": "revise",
  "issues": [
    { "page": 4, "rule": "no-overset", "fix": "shorten caption to ≤ 1 line" },
    { "page": 1, "rule": "palette", "fix": "swap #2bb to token accent" }
  ]
}
```

Those issues are fed straight back into the generator's next turn as constraints. The loop runs until the verdict is `pass` or a max iteration count trips — and that cap matters, because the second failure mode of these loops isn't quitting too early, it's never quitting at all.

## The two ways it goes wrong

- **The sycophantic reviewer.** Models love to approve. Left unprompted, the critic rubber-stamps. The cure is to forbid a global "looks good" and require it to either return a populated issue list or explicitly assert each rubric line passed. Make approval expensive.
- **The infinite polish.** Two agents can ping a document back and forth forever, trading microscopic tweaks. So every loop needs a budget and a notion of "good enough." Converge, then ship.

## Why this generalises

Nothing here is really about documents. The pattern — **generate → render the real artifact → judge against an explicit rubric → return structured fixes → repeat under a budget** — is how you make *any* agentic output trustworthy. Swap the document for a web page and the reviewer reads a screenshot. Swap it for code and the reviewer reads the test output. Swap it for a chart and it checks the encoding.

The lesson I keep relearning: the model that *makes* the thing is rarely the bottleneck. The system that decides whether the thing is *done* — that's where reliability actually comes from.
