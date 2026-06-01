---
title: "An Agent That Practices With You"
dek: "Most music AI tries to replace the musician. I wanted the opposite — a partner that listens, responds, and makes practising alone feel less alone."
category: "Audio & Music"
date: "2026-05-25"
accent: "#a96a25"
glyph: "∿"
repo: "improvisApp"
stack: ["TypeScript", "MIDI", "Real-time", "LLM"]
readingTime: "5 min read"
featured: false
order: 6
tags:
  - music
  - agents
  - real-time
  - creativity
---

<p class="lead">There's a specific loneliness to practising an instrument. The metronome doesn't care. The backing track doesn't listen. You play a phrase, and nothing answers it. This experiment started from a question: what would it take for a machine to be a <em>musical partner</em> rather than a musical product — something that hears what you play and plays something back?</p>

<div class="exchange">
<div class="turn you"><span class="who">You play</span>A rising phrase in D minor — a question, left hanging.</div>
<div class="turn agent"><span class="who">Agent answers</span>A descending reply that resolves it, landing right on the beat.</div>
<div class="turn you"><span class="who">You play</span>The same motif, displaced — pushing the energy upward.</div>
<div class="turn agent"><span class="who">Agent answers</span>It echoes the motif back, transformed, and holds the tension.</div>
</div>
<div class="meter">
<div class="track"><div class="fill" style="width:18%"></div></div>
<span class="lab">latency budget — a reply two bars late isn't a reply, it's an interruption</span>
</div>

## Replacement versus accompaniment

A lot of generative music aims to produce a finished piece — press a button, receive a song. That's a fine goal, but it's not the one that excites me. I'm more interested in the *call and response* — the conversational core of jazz, of jamming, of a teacher trading fours with a student. That framing changes every design decision.

A replacement model can take its time and render offline. A partner has to work in **real time**, because a response that arrives two bars late isn't a response — it's an interruption. Latency stops being a performance metric and becomes the *entire feel* of the thing. Music lives or dies on timing, and a partner that can't keep time isn't a partner.

<div class="callout">
<span class="label">The constraint that defines it</span>
A musical partner is a <strong>real-time, low-latency</strong> system first and a clever one second. A slightly less interesting phrase delivered <em>on the beat</em> beats a brilliant phrase delivered late, every single time. Groove is non-negotiable.
</div>

## Listen, understand, answer

The loop mirrors what a human improviser does without thinking:

1. **Listen.** Capture what the player just played as MIDI — the same symbolic representation from the audio-to-notation work. Notes, timing, velocity.
2. **Understand.** Read intent from the notes: what key are we in, where's the harmony sitting, is this phrase a question or a statement, are we building energy or releasing it?
3. **Answer.** Generate a response that *fits* — completes the phrase, trades a lick, lays down a complementary line — and play it back in time.

Working in MIDI rather than raw audio is what makes the middle step tractable. You're reasoning about *notes and intent*, not wrestling with waveforms. The music becomes legible — structured enough that a model can have an opinion about it.

## Coherence is the real problem

The naive version generates a fresh response to each phrase in isolation, and it sounds exactly like that: musical non-sequiturs, a partner with no memory, forgetting the conversation the instant it happens. Real improvisation has *continuity*. Motifs return. A theme stated early comes back transformed. Tension you build has to resolve.

So the agent needs a sense of the arc — not just "what fits this bar" but "where is this jam going, and what did we already say." That's a memory-and-structure problem more than a note-generation one, and it's the part still very much in the lab. The honest status: short exchanges feel genuinely alive; sustaining a coherent *story* across minutes is hard, in exactly the way it's hard for human beginners too.

## Why bother

Because the goal was never a better song generator. It was to make a tool that changes how it *feels* to sit down and practise — to give the solitary musician something that listens back. Even in its rough state, trading phrases with something that actually responds to what you played is a different experience from playing into a void.

The broader idea I keep chasing: agents are most interesting not when they *replace* a human activity but when they sit *inside* it as a partner — fast enough, attentive enough, and responsive enough that the human does their best work because something is finally listening.
