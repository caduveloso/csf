---
title: "Wrangling Messy Government Documents with Agents"
dek: "Real-world data doesn't arrive as clean JSON. It arrives as scanned PDFs, broken portals, and inconsistent forms. This is the unglamorous pipeline that tames it."
category: "Document Intelligence"
date: "2026-04-30"
accent: "#5c7355"
glyph: "▤"
repo: "inclusao-salic"
stack: ["TypeScript", "Scraping", "PDF", "LLM extraction"]
readingTime: "6 min read"
featured: false
order: 8
tags:
  - documents
  - extraction
  - automation
  - government-data
---

<p class="lead">The demos always use clean data. Reality hands you a government portal from 2011, PDFs that are really photographs of paper, forms where the same field is spelled three different ways, and downloads that fail one time in five. A lot of my work touches <strong>SALIC</strong> — Brazil's cultural-incentive system — and that world is the perfect teacher for what document intelligence actually requires.</p>

## The shape of real-world data

Here's the gap between the brochure and the building. In the brochure, "process the documents" is one step. In the building it's a gauntlet:

- The source is a **portal that fights you** — pagination that breaks, sessions that expire, downloads that silently fail.
- The documents are **PDFs in name only** — some are real text, some are scans, some are scans *of* printouts of spreadsheets.
- The structure is **almost-but-not-quite consistent** — every document is 90% the same and 10% surprising, and the 10% is never in the same place.

Any one of these is manageable. Together they mean you can't write a rigid parser and walk away. The pipeline has to expect mess at every stage.

## Stage one: acquisition is half the battle

Before you extract anything, you have to *reliably get the files*, and against a flaky portal that's a real engineering problem. The work here is deeply unglamorous and absolutely decides whether the project exists: retry failed downloads, resume where a run died, detect when the portal handed you an error page dressed as a PDF, and keep a ledger of what you already have so a re-run doesn't start from zero.

<div class="callout">
<span class="label">Lesson from the trenches</span>
Assume every external step <strong>will</strong> fail and design for resumability from day one. A scraper that can't pick up where it crashed is a scraper you'll be babysitting at 2 a.m. Idempotence isn't a nicety here; it's the difference between a tool and a chore.
</div>

## Stage two: normalise to one clean format

Downstream logic should never know or care whether a document arrived as clean text or a photograph. So the second stage flattens everything to a single normalised representation — for me, Markdown. Real-text PDFs get parsed directly; scanned ones go through OCR; the output of both is the *same* clean, structured text.

This normalisation seam is the most important architectural line in the system. It means the messy, source-specific ugliness is quarantined in one place, and everything after it operates on uniform, predictable input. You debug acquisition and conversion *once*, and the rest of the pipeline gets to live in a clean world.

## Stage three: extraction, where the model earns its keep

Now the interesting part. From normalised text you need *structured facts* — names, values, dates, categories, line items. This is precisely where a rigid parser shatters on that inconsistent 10%, and where a language model shines: it can read a slightly-different document and still understand "this is the project budget" even when the label moved or got reworded.

But — and this is the load-bearing caveat — you do not let the model free-associate. You hand it the normalised text, an explicit schema of exactly what you want, and a hard instruction to ground every value in the source and flag anything it can't find. The model provides the *flexibility* that rigid code lacks; the schema provides the *discipline* the model lacks. Together they handle real documents.

## Stage four: human-in-the-loop, by design

For anything consequential — and incentive filings are consequential — the output is not the end. It's a *draft for review*. The system's job isn't to be trusted blindly; it's to do 95% of the work and then surface its own uncertainty so a human can check the 5% that matters.

That means the most useful thing the pipeline produces isn't just the extracted data — it's a clear view of *where it wasn't sure*. Low-confidence fields, values it couldn't locate, documents that didn't match the expected shape. Good document intelligence doesn't hide its doubt; it routes attention to exactly the places a person is needed.

## The pattern under all of it

Strip away the specifics of any one portal and the same skeleton remains: **acquire reliably → normalise ruthlessly → extract flexibly → review deliberately.** It's not glamorous and there's no clever trick at the centre. The craft is in respecting how hostile real data is, and building each stage to fail gracefully and hand off cleanly to the next. That's the whole job — and it's most of what "AI for documents" actually means in practice.
