---
title: "From Audio to Notation: Teaching Machines to Hear Music"
dek: "Recording a melody is easy. Turning that recording into readable sheet music is a surprisingly deep pipeline — pitch, rhythm, and a lot of human convention."
category: "Audio & Music"
date: "2026-04-20"
accent: "#d97706"
glyph: "♪"
repo: "audio-to-sheet"
stack: ["TypeScript", "DSP", "MIDI", "Notation"]
readingTime: "7 min read"
featured: false
order: 5
tags:
  - audio
  - music
  - dsp
  - machine-listening
---

<p class="lead">I hummed a melody into my phone and wanted it back as sheet music. That one wish turned into a chain of small experiments, because the gap between "a sound" and "a score" is much wider than it looks. Sound is continuous, physical, and messy. Notation is discrete, symbolic, and full of human convention. Bridging them is the whole problem.</p>

The pipeline breaks into stages that each turned out to be their own little research project: **audio → pitch & onsets → MIDI → quantised rhythm → engraved notation.** Each stage throws away ambiguity and adds structure. Let me walk the chain.

## Stage one: what note, and when?

Raw audio is a wall of amplitude over time. The first job is to find two things hiding inside it: *pitch* (what note is sounding) and *onsets* (the moment each note begins).

Pitch detection sounds trivial — "find the frequency" — until you remember that a real instrument isn't a pure tone. A single sung note is a fundamental frequency stacked with overtones, plus breath, plus room. The trick is to estimate the fundamental robustly while ignoring the harmonics riding on top of it. Onset detection is its own art: you're looking for the sudden energy changes that mark a new note, while *not* firing on vibrato, bow noise, or a singer's wobble.

<div class="callout">
<span class="label">The hard truth of stage one</span>
This is where most of the error lives. Everything downstream inherits whatever mistakes you make here — a missed onset becomes a missing note in the score. Get pitch and timing right and the rest is bookkeeping; get them wrong and no amount of clever notation saves you.
</div>

## Stage two: MIDI as the lingua franca

Once you have "this pitch started at this time and lasted this long," you have something MIDI can hold. MIDI is the pivot of the whole system — a clean, discrete, symbolic representation of notes as events:

```text
note_on  pitch=60 (C4)  time=0.00s  velocity=92
note_off pitch=60       time=0.48s
note_on  pitch=64 (E4)  time=0.50s  velocity=88
```

The value of landing here is that MIDI is *universal*. Every downstream tool — a DAW, a notation engine, a synth — speaks it. So the messy, perceptual problem (listening) is now cleanly separated from the symbolic problem (writing it down). That seam is worth engineering hard, because it lets you debug each half in isolation.

## Stage three: rhythm is where humans disagree

Here's the stage I underestimated. A human performance is never metronomic — you rush, you drag, you breathe. MIDtimes are real numbers like `0.48s`. But notation only knows *quarter notes* and *eighth notes* — clean fractions of a beat. Turning the first into the second is **quantisation**, and it's a genuinely hard judgement call.

Quantise too hard and you flatten the music — every expressive nudge snaps to a rigid grid and the melody loses its soul. Quantise too softly and you get an unreadable thicket of thirty-second notes and absurd tuplets that no musician would ever write. The "right" answer isn't mathematical; it's a guess about what the player *meant*. This is exactly the kind of ambiguity where a model's sense of musical convention earns its keep — it can lean toward the notation a human would actually have written.

## Stage four: engraving, the invisible craft

The last mile is turning quantised events into a *readable page* — and music notation has centuries of convention baked in. Stems point up or down depending on the staff position. Beams group notes to reveal the beat. Accidentals carry through a measure and reset at the bar line. Rests fill silence explicitly. None of it is optional; a score that ignores these rules is technically correct and practically illegible.

This rhymes hard with the document work elsewhere in this notebook: notation *is* a design system, refined over hundreds of years. The engraver's job is to take correct symbolic content and render it according to a strict, shared visual grammar — so any trained reader can sight-read it cold.

## What the chain taught me

- **Stage your ambiguity.** Each step throws away a specific kind of uncertainty. Keeping them separate means each failure is diagnosable — you can listen to the MIDI, inspect the quantisation, check the engraving, independently.
- **The hard part is perception, not symbols.** Once you're in MIDI, it's software. The genuinely difficult, error-prone work is the first hop, from physical sound to discrete intent.
- **Music is convention all the way down.** Both ends of the pipeline — hearing and writing — are saturated with human agreement about what things mean. The machine isn't discovering truth; it's learning to participate in a tradition.

I set out to turn a hum into a score. I came away with a much deeper respect for every musician who can do, instantly and unconsciously, what took me a pipeline of five stages to approximate.
