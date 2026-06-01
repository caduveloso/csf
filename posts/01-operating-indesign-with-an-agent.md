---
title: "Teaching an Agent to Operate InDesign"
dek: "How a language model learned to drive professional page-layout software — and produce documents that actually look designed."
category: "Agentic Design"
date: "2026-05-21"
accent: "#b65b3c"
glyph: "❖"
repo: "text-to-indesign-skill"
stack: ["TypeScript", "InDesign Scripting", "Claude", "Design tokens"]
readingTime: "7 min read"
featured: true
order: 1
tags:
  - agents
  - design-systems
  - indesign
  - automation
---

<p class="lead">There is a particular kind of document that no amount of HTML-to-PDF will give you: a real, typeset page. Proper baseline grids, optical margins, paragraph styles that cascade, a cover that breathes. That craft has lived inside Adobe InDesign for thirty years — and InDesign has always been driven by a human hand. This experiment was about replacing the hand with an agent, without losing the craft.</p>

The premise was simple to state and hard to do: give a language model a brief — *"a 12-page quarterly report for a cultural fund, formal but warm"* — and have it return a finished `.indd` document that a designer would sign off on.

## Why not just generate a PDF?

<div class="aside-note">Print reaches for a hundred niceties — hanging punctuation, optical margins, true baseline grids — that flattened HTML never bothers with. Closing that gap is the whole point.</div>

The temptation is to skip InDesign entirely. Render some styled HTML, print to PDF, ship it. I tried that first, and the output always had the same tell: it looked like a *web page that had been flattened*, not like a document that had been *set*. No hanging punctuation, no real grid, captions that drifted, widows and orphans everywhere.

InDesign is the opposite. It is opinionated about typography in exactly the ways that make print look expensive. The catch is that all of that lives behind a GUI. So the real question became: **what is the agent's keyboard?**

## The agent's keyboard: scripting, not clicking

<div class="aside-note">The model never touches a mouse. Its “keyboard” is the scripting API — every move it makes is a function call a human could read and audit.</div>

InDesign exposes an automation surface — an ExtendScript / UXP scripting API — that can do essentially everything the UI can: create documents, define paragraph and character styles, place frames, flow text, apply master pages, export PDF. That API is the agent's keyboard.

So the skill became a translation layer. The model never "sees" the canvas and drags boxes. Instead it emits a structured plan, and a deterministic runtime turns that plan into scripting calls:

```ts
// The model proposes structure; the runtime executes it.
doc.applyStyle("H1", { font: "Newsreader", size: 28, leading: 32 });
doc.flow("body", markdownAst, { style: "Body", grid: "baseline" });
doc.placeMaster("A-cover", { page: 1 });
doc.export("report.pdf", { preset: "Press Quality" });
```

<div class="callout">
<span class="label">The core idea</span>
Don't ask the model to <strong>render</strong> — ask it to <strong>specify</strong>. The agent's job is to decide <em>what</em> goes where and <em>why</em>; a boring, deterministic executor handles the <em>how</em>. Creativity on top, predictability underneath.
</div>

This split matters more than it looks. Models are wonderful at structure and intent and terrible at pixel-precise manipulation. By moving the pixels into a deterministic layer, every failure becomes legible: either the plan was wrong (a model problem) or the executor mis-ran it (a code problem). You almost never get the soupy "it just looks off and I don't know why" failure that plagues end-to-end image generation.

## The design system is the guardrail

A blank canvas is the enemy. If you let an agent choose any font at any size, it will — and the result is a ransom note. The fix was to never give it a blank canvas.

<div class="aside-note">A token like <code>body</code> packs a dozen typographic decisions into one word — so the prompt stays short and the output stays on-brand.</div>

Everything the agent is allowed to do is expressed as **design tokens**: a constrained vocabulary of type scales, spacing units, a palette, a small set of named paragraph and object styles. The model doesn't pick `19.4px`; it picks `body`. It doesn't invent a teal; it picks `accent`. The design system isn't documentation that sits beside the work — it is the *only set of moves on the board*.

This is the single highest-leverage decision in the whole project. The design system does three jobs at once:

- **It bounds quality.** Anything the agent assembles is, by construction, made of pieces a designer already approved.
- **It compresses the prompt.** "Use `lead` for the opening paragraph" carries a dozen typographic decisions in one token.
- **It makes QA possible.** When every element maps to a known style, you can *check* the output against the spec — which is the next experiment over.

## What broke, and what that taught me

The honest part. Early runs failed in instructive ways:

1. **Text overset.** The model would write a caption three lines long for a frame sized for one. Lesson: layout is a negotiation between content and container, and the agent has to be told the container's constraints *before* it writes, not after.
2. **Semantic drift.** Asked for "a pull quote," it would bold a random sentence rather than apply the `pullquote` style. Lesson: tie intent to tokens explicitly in the system prompt, with examples.
3. **Confident nonsense.** It would happily report "document exported successfully" when the script had thrown halfway. Lesson: trust nothing the model says about the world — only the runtime's structured result.

Each of these pushed the architecture toward the same principle: **the model proposes, the environment disposes, and only the environment is believed.**

## Where it landed

The result is a skill that takes a brief and structured content and returns a typeset document built entirely from an approved system — covers, running heads, baseline-gridded body, real styles you can still open and edit by hand. It isn't "AI replaces the designer." It's closer to a very fast, very literal junior who has memorised the style guide and will execute it a hundred times without getting bored.

The interesting frontier isn't generation — it's *judgement*. A document can be technically perfect and still feel wrong. That gap is exactly what the next experiment, agentic QA, set out to close.
