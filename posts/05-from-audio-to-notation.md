---
title: "From Audio to Notation: Teaching Machines to Hear Music"
dek: "Recording a melody is easy. Turning that recording into readable sheet music is a surprisingly deep pipeline — pitch, rhythm, and a lot of human convention."
category: "Audio & Music"
date: "2026-04-20"
accent: "#b5832e"
glyph: "♪"
repo: "audio-to-sheet"
stack: ["TypeScript", "DSP", "MIDI", "Notation"]
readingTime: "8 min read"
featured: true
order: 5
tags:
  - audio
  - music
  - dsp
  - machine-listening
---

<p class="lead">I hummed a melody into my phone and wanted it back as sheet music. That one wish turned into a chain of small experiments, because the gap between "a sound" and "a score" is much wider than it looks. Sound is continuous, physical, and messy. Notation is discrete, symbolic, and full of human convention. Bridging them is the whole problem.</p>

The journey is a pipeline, and each stage throws away a particular kind of ambiguity while adding a layer of structure. Before we walk it slowly, here is the whole chain at a glance.

<div class="figure-block draw">
<svg class="diagram" viewBox="0 0 920 150" role="img" aria-label="Five-stage pipeline from audio to notation">
<defs><marker id="ah" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" class="d-stroke d-accent" fill="none"/></marker></defs>
<g>
<rect x="6" y="34" width="150" height="58" rx="12" class="d-stroke d-soft"/>
<text class="d-label" x="81" y="60" text-anchor="middle">Audio</text>
<text class="d-sub" x="81" y="78" text-anchor="middle">continuous</text>
</g>
<g>
<rect x="194" y="34" width="150" height="58" rx="12" class="d-stroke d-soft"/>
<text class="d-label" x="269" y="60" text-anchor="middle">Pitch &amp; onset</text>
<text class="d-sub" x="269" y="78" text-anchor="middle">what &amp; when</text>
</g>
<g>
<rect x="382" y="34" width="150" height="58" rx="12" class="d-stroke d-soft"/>
<text class="d-label" x="457" y="60" text-anchor="middle">MIDI</text>
<text class="d-sub" x="457" y="78" text-anchor="middle">symbolic events</text>
</g>
<g>
<rect x="570" y="34" width="150" height="58" rx="12" class="d-stroke d-soft"/>
<text class="d-label" x="645" y="60" text-anchor="middle">Quantise</text>
<text class="d-sub" x="645" y="78" text-anchor="middle">onto the grid</text>
</g>
<g>
<rect x="758" y="34" width="150" height="58" rx="12" class="d-stroke d-accent"/>
<text class="d-label" x="833" y="60" text-anchor="middle">Engrave</text>
<text class="d-sub" x="833" y="78" text-anchor="middle">onto the page</text>
</g>
<line data-draw pathLength="1" x1="158" y1="63" x2="192" y2="63" class="d-stroke d-accent" marker-end="url(#ah)"/>
<line data-draw pathLength="1" x1="346" y1="63" x2="380" y2="63" class="d-stroke d-accent" marker-end="url(#ah)"/>
<line data-draw pathLength="1" x1="534" y1="63" x2="568" y2="63" class="d-stroke d-accent" marker-end="url(#ah)"/>
<line data-draw pathLength="1" x1="722" y1="63" x2="756" y2="63" class="d-stroke d-accent" marker-end="url(#ah)"/>
</svg>
<div class="caption">The chain, end to end. Each arrow discards a kind of uncertainty and hands cleaner structure to the next stage.</div>
</div>

Sound goes in on the left; a readable page comes out on the right. The interesting part is that the *hard* problem and the *fiddly* problem are not where you'd guess — so let's take it one stage at a time.

<div class="figure-block draw">
<svg class="diagram" viewBox="0 0 640 170" role="img" aria-label="A waveform becoming notes on a staff">
<path data-draw pathLength="1" class="d-stroke d-accent" d="M16,85 C40,30 64,140 88,85 C112,30 136,140 160,85 C184,30 208,140 232,85 C256,55 268,110 280,85"/>
<line data-draw pathLength="1" x1="300" y1="85" x2="340" y2="85" class="d-stroke" marker-end="url(#ah2)"/>
<defs><marker id="ah2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" class="d-stroke" fill="none"/></marker></defs>
<line x1="372" y1="58" x2="624" y2="58" class="d-stroke d-soft"/>
<line x1="372" y1="72" x2="624" y2="72" class="d-stroke d-soft"/>
<line x1="372" y1="86" x2="624" y2="86" class="d-stroke d-soft"/>
<line x1="372" y1="100" x2="624" y2="100" class="d-stroke d-soft"/>
<line x1="372" y1="114" x2="624" y2="114" class="d-stroke d-soft"/>
<g class="d-fill-accent">
<ellipse cx="412" cy="100" rx="9" ry="6.5"/><line x1="421" y1="100" x2="421" y2="66" class="d-stroke d-accent"/>
<ellipse cx="470" cy="86" rx="9" ry="6.5"/><line x1="479" y1="86" x2="479" y2="52" class="d-stroke d-accent"/>
<ellipse cx="528" cy="72" rx="9" ry="6.5"/><line x1="537" y1="72" x2="537" y2="40" class="d-stroke d-accent"/>
<ellipse cx="586" cy="100" rx="9" ry="6.5"/><line x1="595" y1="100" x2="595" y2="66" class="d-stroke d-accent"/>
</g>
</svg>
<div class="caption">The whole ambition in one drawing: a continuous wave on the left, discrete notes on a staff on the right.</div>
</div>

## Walk the chain, stage by stage

Below, the diagram on the side holds still while the text moves — each step lights up the part of the pipeline it's describing. This is the shape I keep in my head when something goes wrong: find the stage, isolate the failure, fix it there.

<div class="scrolly">
<div class="scrolly-figure" data-active="1">
<svg class="diagram" viewBox="0 0 400 372" role="img" aria-label="The four working stages of the pipeline">
<g data-part="1">
<rect x="8" y="8" width="384" height="78" rx="14" class="d-stroke d-soft"/>
<text class="d-label" x="30" y="40">01 · Listen</text>
<text class="d-sub" x="30" y="60">pitch &amp; onset</text>
<path class="d-stroke d-accent" d="M236,47 C252,18 268,76 284,47 C300,18 316,76 332,47 C348,30 360,64 372,47"/>
</g>
<g data-part="2">
<rect x="8" y="98" width="384" height="78" rx="14" class="d-stroke d-soft"/>
<text class="d-label" x="30" y="130">02 · MIDI</text>
<text class="d-sub" x="30" y="150">symbolic events</text>
<rect x="236" y="120" width="40" height="9" rx="3" class="d-fill-accent"/>
<rect x="286" y="134" width="30" height="9" rx="3" class="d-fill-accent"/>
<rect x="326" y="148" width="46" height="9" rx="3" class="d-fill-accent"/>
</g>
<g data-part="3">
<rect x="8" y="188" width="384" height="78" rx="14" class="d-stroke d-soft"/>
<text class="d-label" x="30" y="220">03 · Quantise</text>
<text class="d-sub" x="30" y="240">onto the grid</text>
<line x1="236" y1="205" x2="236" y2="252" class="d-stroke d-soft"/>
<line x1="270" y1="205" x2="270" y2="252" class="d-stroke d-soft"/>
<line x1="304" y1="205" x2="304" y2="252" class="d-stroke d-soft"/>
<line x1="338" y1="205" x2="338" y2="252" class="d-stroke d-soft"/>
<line x1="372" y1="205" x2="372" y2="252" class="d-stroke d-soft"/>
<circle cx="270" cy="228" r="6" class="d-fill-accent"/>
<circle cx="338" cy="228" r="6" class="d-fill-accent"/>
</g>
<g data-part="4">
<rect x="8" y="278" width="384" height="86" rx="14" class="d-stroke d-accent"/>
<text class="d-label" x="30" y="312">04 · Engrave</text>
<text class="d-sub" x="30" y="332">onto the page</text>
<line x1="236" y1="300" x2="372" y2="300" class="d-stroke d-soft"/>
<line x1="236" y1="312" x2="372" y2="312" class="d-stroke d-soft"/>
<line x1="236" y1="324" x2="372" y2="324" class="d-stroke d-soft"/>
<line x1="236" y1="336" x2="372" y2="336" class="d-stroke d-soft"/>
<line x1="236" y1="348" x2="372" y2="348" class="d-stroke d-soft"/>
<ellipse cx="262" cy="336" rx="7" ry="5" class="d-fill-accent"/><line x1="269" y1="336" x2="269" y2="308" class="d-stroke d-accent"/>
<ellipse cx="312" cy="324" rx="7" ry="5" class="d-fill-accent"/><line x1="319" y1="324" x2="319" y2="296" class="d-stroke d-accent"/>
<ellipse cx="356" cy="348" rx="7" ry="5" class="d-fill-accent"/><line x1="363" y1="348" x2="363" y2="320" class="d-stroke d-accent"/>
</g>
</svg>
</div>
<div class="scrolly-steps">
<div class="scrolly-step active" data-step="1"><span class="n">Stage 01 — Listen</span><p>Raw audio is a wall of amplitude over time. The first job is to find two things hiding inside it: <em>pitch</em> (what note is sounding) and <em>onsets</em> (the moment each note begins). A sung note isn't a pure tone — it's a fundamental stacked with overtones, plus breath and room. You estimate the fundamental robustly while ignoring the harmonics riding on top, and detect onsets without firing on vibrato or a singer's wobble. This is where most of the error lives; everything downstream inherits it.</p></div>
<div class="scrolly-step" data-step="2"><span class="n">Stage 02 — MIDI</span><p>Once you have "this pitch started here and lasted this long," MIDI can hold it: a clean, discrete stream of note-on / note-off events. This is the pivot of the whole system, because MIDI is <em>universal</em> — every DAW, notation engine and synth speaks it. The messy perceptual problem (listening) is now cleanly separated from the symbolic one (writing it down). Engineer that seam hard; it lets you debug each half in isolation.</p></div>
<div class="scrolly-step" data-step="3"><span class="n">Stage 03 — Quantise</span><p>Here's the stage I underestimated. A human performance is never metronomic — you rush, you drag, you breathe. MIDI times are real numbers; notation only knows clean fractions of a beat. Snapping one to the other is a genuine judgement call: too hard and you flatten the music's soul, too soft and you get an unreadable thicket of tuplets. The "right" answer isn't mathematical — it's a guess about what the player <em>meant</em>, exactly where a model's sense of musical convention earns its keep.</p></div>
<div class="scrolly-step" data-step="4"><span class="n">Stage 04 — Engrave</span><p>The last mile turns quantised events into a <em>readable page</em>, and notation has centuries of convention baked in. Stems point up or down by staff position. Beams group notes to reveal the beat. Accidentals carry through a measure and reset at the bar line. None of it is optional — a score that ignores these rules is technically correct and practically illegible. Engraving <em>is</em> a design system, refined over hundreds of years.</p></div>
</div>
</div>

<div class="callout">
<span class="label">The hard truth of the pipeline</span>
The genuinely difficult work is the <strong>first hop</strong> — physical sound to discrete intent. Once you're in MIDI, it's software. Stage your ambiguity so each failure is diagnosable on its own: listen to the MIDI, inspect the quantisation, check the engraving, independently.
</div>

## Rhythm is where humans disagree

It's worth lingering on quantisation, because it's the stage that taught me the most. Two performances of the same melody are never timed identically, and neither is "wrong." The notation you *want* is the one a musician would have written down — which is a question about intent, not arithmetic.

This is the seam where a model genuinely helps. Pure rounding to the nearest sixteenth is brittle; it produces notation no human would choose. A model with a feel for musical convention can lean toward the *plausible* reading — the one that preserves the swing without drowning the page in detail. It's the same lesson as the rest of this notebook: the machine isn't discovering truth, it's learning to participate in a tradition.

> Sound is continuous; notation is discrete. Everything interesting happens in the translation between the two.

## What the chain taught me

- **Stage your ambiguity.** Each step throws away a specific kind of uncertainty. Keeping them separate means each failure is diagnosable in isolation.
- **The hard part is perception, not symbols.** Once you're in MIDI, it's ordinary software. The error-prone work is the first hop, from physical sound to discrete intent.
- **Music is convention all the way down.** Both ends of the pipeline — hearing and writing — are saturated with human agreement about what things mean.

I set out to turn a hum into a score. I came away with a much deeper respect for every musician who can do, instantly and unconsciously, what took me a pipeline of five stages to approximate.
