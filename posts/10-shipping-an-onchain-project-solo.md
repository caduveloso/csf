---
title: "Regular Punks: Shipping an On-Chain Project, Solo"
dek: "Contracts, a subgraph, a mint page, staking, snapshots, allowlists, a game. One person can now hold an entire web3 product in their head — if they let agents hold the parts."
category: "Shipping"
date: "2026-02-14"
accent: "#9e4b43"
glyph: "◈"
repo: "regular-punks-game"
stack: ["Solidity", "TypeScript", "The Graph", "Next.js"]
readingTime: "6 min read"
featured: false
order: 10
tags:
  - web3
  - solidity
  - full-stack
  - shipping
---

<p class="lead">A real on-chain product is not one thing. It's a constellation: smart contracts, a subgraph to index them, a mint page, a staking flow, snapshot and allowlist tooling, a backend, and — because it should be fun — a game on top. A few years ago that's a team. This experiment was finding out how much of that constellation one person can ship alone when agents carry the repetitive weight.</p>

## The hidden tax of web3 is breadth

The hard part of a project like this was never any single component. Each piece — an ERC contract, a subgraph mapping, a mint button — is individually tractable. The tax is **breadth**: the sheer number of distinct, specialised surfaces that all have to agree with each other.

Count them in the Regular Punks constellation:

- **Contracts** in Solidity — the on-chain source of truth.
- **A subgraph** to index chain events into something queryable.
- **A mint page** with wallet connection and transaction states.
- **Staking** logic, on-chain and in the UI.
- **Snapshot and allowlist tooling** — read holders at a block, compute eligibility, publish the list.
- **A backend** stitching it together.
- **A game** to give the token a reason to exist.

Every one is a different language, a different mental model, a different failure mode. Held in a human head all at once, that breadth is exhausting. Holding it is the actual job.

<div class="callout">
<span class="label">Where agents change the math</span>
The chore work of web3 — a snapshot script, a subgraph mapping, an allowlist generator, boilerplate contract scaffolding — is exactly the kind of well-specified, pattern-heavy task agents do well. Offloading the <em>breadth</em> frees a solo builder to hold the <em>architecture</em>.
</div>

## Separation of concerns, enforced by repos

The thing that made the breadth survivable was refusing to let it tangle. Each concern is its own repo with a sharp boundary — contracts here, subgraph there, frontend, backend, snapshot tool, game, each isolated. The interfaces between them are explicit: the contracts emit events, the subgraph indexes those events, the frontend queries the subgraph, the snapshot tool reads the chain at a block.

That discipline does two things. For me, it keeps each piece small enough to reason about — I'm never holding the whole system in working memory, just one well-bounded box and its contract with its neighbours. For *agents*, it's even more important: an agent dispatched to "update the staking UI" should not be able to wander into the contracts. Tight repo boundaries are guardrails that keep both human and machine attention where it belongs. (This is the same instinct that became the mission-control panel — many small repos demand a way to see and steer them all.)

## On-chain raises the stakes for QA

Most software lets you ship a bug and patch it Tuesday. A deployed contract holding real value does not. Code is law, and law you can't edit is a genuinely different psychological place to work from. It forces a discipline the rest of software is often too lazy for: assume you get one shot.

So the workflow leans hard on everything that catches mistakes *before* they're immutable — exhaustive tests, a demo mode that mirrors production without real funds, dry-runs of every flow. It rhymes with the agentic-QA work: the value isn't in generating the contract, it's in the loop that convinces you it's correct *before* the point of no return. High stakes don't change the principles; they just remove your margin for skipping them.

## What the constellation taught me

- **Breadth, not depth, is the solo builder's wall** — and breadth is exactly what agents are good at lowering.
- **Boundaries are leverage.** Small, isolated repos with explicit interfaces are what let one person — and a swarm of agents — work across a sprawling system without it collapsing into mud.
- **Irreversibility is a teacher.** Building where mistakes are permanent made me a more careful engineer everywhere else, on-chain or not.

The takeaway I carry out of Regular Punks isn't about NFTs or tokens. It's that the ceiling on what one person can ship has risen sharply — and the new skill isn't writing every line, it's *architecting the constellation* and directing the agents that fill it in.
