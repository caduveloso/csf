---
title: "A Design System for Machine-Written Prose"
dek: "Agents produce oceans of Markdown. Almost all of it is rendered ugly. This is the case for treating AI prose as a first-class design problem."
category: "Craft"
date: "2026-05-22"
accent: "#2f6e63"
glyph: "¶"
repo: "md-render"
stack: ["HTML", "CSS", "Typography", "Markdown"]
readingTime: "5 min read"
featured: false
order: 4
tags:
  - typography
  - design-systems
  - markdown
  - reading
---

<p class="lead">We have spent two years making models that write beautifully and then displaying that writing in a grey chat bubble with a default sans-serif at 14 pixels. The intelligence got a thousand times better; the typography stayed where it was in 2008. This experiment is a small protest against that — a design system built specifically for prose that a machine wrote.</p>

<div class="specimen">
<div class="spec-pair">
<div class="spec-card"><div class="big font-display">Aa</div><div class="meta">Fraunces · display serif · titles &amp; headings</div></div>
<div class="spec-card"><div class="big font-text">Aa</div><div class="meta">Newsreader · text serif · the reading voice</div></div>
</div>
<div class="scale">
<div class="row"><span class="lab">Display</span><span class="font-display" style="font-size:2rem">Reading is a designed act</span></div>
<div class="row"><span class="lab">Heading</span><span class="font-display" style="font-size:1.35rem">A token for every node</span></div>
<div class="row"><span class="lab">Body</span><span class="font-text" style="font-size:1.05rem">A measure of about sixty-five characters.</span></div>
<div class="row"><span class="lab">Signal</span><span class="font-mono" style="font-size:0.8rem">const node = ast.heading</span></div>
</div>
<div class="swatches">
<div class="sw"><div class="chip2" style="background:#f4f2ec"></div><div class="nm">paper #f4f2ec</div></div>
<div class="sw"><div class="chip2" style="background:#211f1a"></div><div class="nm">ink #211f1a</div></div>
<div class="sw"><div class="chip2" style="background:#2f6e63"></div><div class="nm">accent #2f6e63</div></div>
<div class="sw"><div class="chip2" style="background:#e3ddd0"></div><div class="nm">line #e3ddd0</div></div>
</div>
</div>

The trigger was mundane. I was generating long, structured documents with agents — reports, briefs, notes — and every renderer I reached for made them look like a README. Functional. Joyless. Forgettable. The words deserved better, so I built a system to set them properly. The page you're reading is its descendant.

## Reading is a designed act

A paragraph is not just text; it's a set of decisions. Measure, leading, the contrast between the body face and the headings, how a blockquote interrupts the flow, what a horizontal rule *feels* like. Get them right and the reader forgets they're reading and just *absorbs*. Get them wrong and every line is a tiny act of friction.

Default Markdown rendering makes all those decisions badly, because it makes none of them on purpose. The system fixes that by being opinionated about a handful of things that carry most of the weight:

- **A serif for the body.** Long-form reading wants a text face with real contrast and rhythm, not a UI font borrowed from a settings panel.
- **A measure around 65 characters.** Lines that run the full width of a monitor are exhausting; the eye loses its place on the return. Constrain the column and reading speeds up.
- **Generous, deliberate vertical rhythm.** Space between elements is not wasted; it's punctuation at the scale of the page.
- **A monospace voice for signal.** Code, labels, metadata — the "machine" register — gets a mono face, so the human voice and the system voice are never confused.

<div class="callout">
<span class="label">The reframe</span>
Markdown isn't a document format — it's an <strong>abstract syntax tree</strong> wearing a plain-text costume. <code>## Heading</code> doesn't mean "big bold line." It means "this node is a section title." A design system's job is to decide what every node <em>becomes</em>, consistently, everywhere.
</div>

## A token for every node

The system maps each Markdown node to an explicit typographic treatment — the same discipline as the InDesign work, aimed at the screen. A heading isn't styled ad hoc; it resolves to a defined step on the type scale. A blockquote has a single, considered look. Inline code, links, lists, captions, callouts — each is a named decision, applied uniformly.

That uniformity is the entire value. When every `##` looks identical across every document, the *structure* becomes legible. Readers learn the visual grammar once and then navigate fluently — they know what a section break feels like, what a callout means, where the eye should rest. The design disappears and the structure speaks.

## Why this matters more in the agent era, not less

It's tempting to call typography a finishing touch. I think it's the opposite — it's becoming infrastructure. Here's the argument:

The volume of machine-generated prose is about to dwarf everything humans have written by hand. Agents will produce most of the documents, summaries, and reports anyone reads. If all of it arrives in undifferentiated grey mush, we lose the ability to *read at a glance* — to skim, to trust, to tell a careful report from a throwaway note. Typography is how a reader decides, in half a second, whether something is worth their attention.

So a prose design system does something quietly important: it gives machine output the visual seriousness that lets humans engage with it as *documents* rather than *chat residue*. It's the difference between a model that talks and a model that *publishes*.

## The smallest possible kit

You don't need much. The version powering this site is a few hundred lines of CSS and a clear set of rules:

1. One serif for reading, one sans for headings and UI, one mono for signal.
2. A fixed measure and a real type scale — no magic numbers.
3. Every Markdown node mapped to exactly one treatment.
4. White space as a designed material, not leftover.

That's it. The lesson is that quality here isn't expensive — it's just *decided*. Most prose looks bad not because good prose is hard, but because nobody chose. This experiment was me choosing, once, and reusing it everywhere.
