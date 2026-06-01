---
title: "A Task Board That Agents Can Read and Write"
dek: "The interface between a human and a fleet of agents shouldn't be a chat log. It should be a board — shared state both sides can see and move."
category: "Agent Infrastructure"
date: "2026-05-26"
accent: "#4f6072"
glyph: "▦"
repo: "task-board-engine"
stack: ["TypeScript", "State engine", "Agents", "Kanban"]
readingTime: "5 min read"
featured: false
order: 9
tags:
  - agents
  - task-management
  - state
  - coordination
---

<p class="lead">When you work with one agent, a chat window is fine. When you work with several, across several projects, chat falls apart fast — it's linear, ephemeral, and only one conversation at a time. What you actually want is the thing teams figured out long ago: a board. Columns, cards, visible state. The twist is building one where the cards can be moved by a human <em>or</em> an agent, and both stay in sync.</p>

<div class="kanban bleed">
<div class="kcol"><div class="h"><span>To do</span><span>2</span></div><div class="kcard"><span class="tg">design-system</span>Add a skip button to step 2</div><div class="kcard"><span class="tg">audio-to-sheet</span>Quantise: handle triplets</div></div>
<div class="kcol"><div class="h"><span>Doing</span><span>1</span></div><div class="kcard"><span class="tg">agent · claude</span>Pin Node to 22 across the fleet</div></div>
<div class="kcol"><div class="h"><span>Review</span><span>1</span></div><div class="kcard"><span class="tg">mink-cli</span>Live status must not cache</div></div>
<div class="kcol"><div class="h"><span>Done</span><span>2</span></div><div class="kcard"><span class="tg">prosperity</span>Bump deps · tests green</div><div class="kcard"><span class="tg">md-render</span>Ship prose tokens</div></div>
</div>
<div class="figure-block draw">
<svg class="diagram" viewBox="0 0 760 92" role="img" aria-label="State machine: todo to doing to review to done">
<defs><marker id="sm" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" class="d-stroke d-accent" fill="none"/></marker></defs>
<g><rect x="6" y="28" width="150" height="40" rx="10" class="d-stroke d-soft d-fill-card"/><text class="d-label" x="81" y="53" text-anchor="middle">todo</text></g>
<g><rect x="208" y="28" width="150" height="40" rx="10" class="d-stroke d-soft d-fill-card"/><text class="d-label" x="283" y="53" text-anchor="middle">doing</text></g>
<g><rect x="410" y="28" width="150" height="40" rx="10" class="d-stroke d-soft d-fill-card"/><text class="d-label" x="485" y="53" text-anchor="middle">review</text></g>
<g><rect x="612" y="28" width="142" height="40" rx="10" class="d-stroke d-accent d-fill-card"/><text class="d-label" x="683" y="53" text-anchor="middle">done</text></g>
<line data-draw pathLength="1" x1="156" y1="48" x2="206" y2="48" class="d-stroke d-accent" marker-end="url(#sm)"/>
<line data-draw pathLength="1" x1="358" y1="48" x2="408" y2="48" class="d-stroke d-accent" marker-end="url(#sm)"/>
<line data-draw pathLength="1" x1="560" y1="48" x2="610" y2="48" class="d-stroke d-accent" marker-end="url(#sm)"/>
</svg>
<div class="caption">Legal transitions only — you can't skip review, and every move is logged.</div>
</div>

## Chat is the wrong interface for many agents

A conversation is a single thread of attention. That's great for one focused exchange and terrible for coordinating parallel work. You can't see five agents' progress at a glance in a chat log. You can't tell what's blocked. You scroll, you lose the thread, you re-ask "where are we?" The interface fights the shape of the work.

A board fixes the mismatch because it's **shared, persistent, visible state**. To-do, doing, review, done. Every card is a unit of work with a status anyone — human or agent — can read and update. The board *is* the conversation, except it doesn't scroll away and you can take it all in at once.

<div class="callout">
<span class="label">The core idea</span>
Treat the task board as the <strong>shared memory</strong> between humans and agents. The human writes intent into a card; an agent picks it up, works it, and moves it to review; the human checks and closes it. Nobody has to be online at the same time, and nothing lives only in someone's head.
</div>

## Tasks as the unit of delegation

This connects straight to the mission-control work elsewhere in the notebook. There, the unit of work became "a task aimed at a repo." A board is where those tasks *live*. Each card carries everything an agent needs to act without a human hovering: what to do, which project, the constraints, what "done" looks like.

That last part — an explicit definition of done — turns out to be the make-or-break detail. A vague card ("improve the onboarding") sends an agent wandering. A sharp one ("add a skip button to step 2; existing tests must pass; don't touch the styling") gives it a target *and* a way to know it's finished. Writing good cards is most of the skill of working with agents, exactly as writing good tickets is most of the skill of running a team.

## The engine underneath

A board is only trustworthy if its state is. Two agents grabbing the same card, a status that updates in one place but not another, a move that half-applies — any of these and people stop believing the board, and the moment they stop believing it, it's dead. So the heart of the project is a small, strict **state engine** with unglamorous but essential properties:

- **Clear ownership.** A card in `doing` has exactly one owner. No double-claims, no two agents quietly redoing each other's work.
- **Legal transitions only.** A card moves `todo → doing → review → done`. You can't skip review. Illegal moves are rejected, not silently swallowed.
- **An audit trail.** Every move is recorded — who, when, why. When something goes sideways across a swarm of agents, the history is how you reconstruct what happened.

None of that is exciting, and all of it is the point. The intelligence lives in the agents; the *trust* lives in the engine that keeps the board honest.

## Why the board, specifically

Because it's the oldest good idea in coordination, and it happens to fit the agent era perfectly. A board externalises state out of fragile, private context and into a shared, durable, glanceable surface. Humans already know how to read one. Agents can read and write one through a tiny, well-defined contract. It degrades gracefully — an agent goes offline mid-task and the card just sits in `doing`, waiting, with no lost thread to reconstruct.

The longer I build with agents, the more I think the leverage isn't in any single clever agent. It's in the *connective tissue* — the shared surfaces where humans and machines hand work back and forth without dropping it. A board you can both read and write is one of the most useful pieces of that tissue I've built.
