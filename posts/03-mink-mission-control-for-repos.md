---
title: "Mink: A Mission-Control Panel for a Fleet of Repos"
dek: "When one person runs dozens of projects, the bottleneck stops being code and becomes context-switching. Mink is the control tower I built to fix that."
category: "Agent Infrastructure"
date: "2026-05-29"
accent: "#54667a"
glyph: "⌘"
repo: "mink-3000-cli"
stack: ["TypeScript", "CLI", "Git", "Agents"]
readingTime: "6 min read"
featured: true
order: 3
tags:
  - agents
  - developer-tools
  - cli
  - orchestration
---

<p class="lead">At some point my GitHub stopped looking like a portfolio and started looking like a fleet. Contracts here, a subgraph there, three frontends, a scraper, a music tool, a document pipeline. Each one a separate repo, separate branch, separate half-loaded mental model. The work wasn't hard. The <em>switching</em> was. Mink is the panel I built to run the whole fleet from one place.</p>

## The problem nobody warns you about

Solo, with agents, you can suddenly maintain a dozen active projects. That sounds like leverage — and it is, until you measure where the day actually goes. It goes to overhead: `cd`-ing into a repo, remembering which branch, checking if it's dirty, pulling, reading the last thing you did, re-establishing context, then *finally* doing the work. Multiply by twelve and the real job becomes navigation.

Agents make this paradox sharper. They can do an enormous amount of work *inside* a repo — but they have no idea the other eleven exist. Each one wakes up in a fresh container with amnesia. The intelligence is local; the coordination is missing. Mink is an attempt to put the coordination somewhere.

## A panel, not a pile of scripts

Mink is a CLI that treats my repositories as a single surface. The mental model is an air-traffic control tower: every project is an aircraft, and you want one screen that shows all of them and lets you direct any of them.

```text
  MINK · fleet status
  ──────────────────────────────────────────────
  ▸ mink-3000-cli        main      ✔ clean
  ▸ design-system        main      ● 2 ahead
  ▸ text-to-indesign     feat/qa   ✎ dirty
  ▸ audio-to-sheet       main      ⤓ behind origin
  ▸ regular-punks-game   main      ✔ clean
  ──────────────────────────────────────────────
  > dispatch "bump deps and run tests" --to design-system
```

The two operations that matter:

- **See everything.** One command, the true state of every repo: branch, dirty/clean, ahead/behind, last activity. No `cd`, no guessing.
- **Dispatch anything.** Aim an instruction at one repo — or fan it out across many — and let an agent carry it out *there*, in that repo's context, while you stay in the tower.

<div class="callout">
<span class="label">The shift</span>
The unit of work stops being "a repo I'm inside of" and becomes "a task I aim at a repo." You stop <em>being</em> in projects and start <em>directing</em> them. That reframing is the entire point.
</div>

## Fan-out is the superpower

The single most satisfying thing Mink does is run the same intent across many repos at once. "Update the license header." "Pin Node to 22." "Add a CI step that runs the linter." These are five-minute jobs that, across a fleet, used to eat an afternoon of mind-numbing repetition.

Fanned out, they become one line. Each target gets its own agent, its own working copy, its own branch — the work happens in parallel, isolated, and reports back to the panel. The tower stays calm while the fleet moves.

The thing I underestimated: fan-out doesn't just save time, it *changes what's worth doing*. Maintenance chores you'd never bother with on twelve repos individually become trivial when they're one command. The fleet gets healthier because keeping it healthy finally got cheap.

## Hard-won lessons

- **Isolation is non-negotiable.** Every dispatched task runs on its own branch in its own checkout. Agents working in a shared tree step on each other instantly. Give each one a sandbox or accept chaos.
- **The panel must never lie.** A status line that's even slightly stale is worse than none — you'll act on a false picture. Mink recomputes state live rather than caching it, because a control tower's only job is to be *correct about right now*.
- **A human still holds the keys.** Fan-out is powerful enough to make a mess across a dozen repos in seconds. Dispatched work lands on branches, not `main`. The tower proposes; I merge. The leverage is real, and so is the blast radius — you design for both.

## Why I keep coming back to it

Mink didn't make me a better programmer. It made the *fleet* tractable. The bottleneck of the agent era isn't writing code — agents write plenty. It's orchestration: knowing what's where, aiming effort, keeping a dozen plates spinning without dropping the one you forgot about. A good panel is leverage on leverage. That's the experiment worth continuing.
