---
name: information-architecture
description: Use at Phase 2 to derive the exact page set from strategy goals, define what each page must achieve, and produce the sitemap and page briefs that govern all copy and design work.
---
# Information Architecture

## Purpose

Decide what pages exist and why — before writing a single word of copy. Every page must be
justified by a goal in `site/strategy.md`. Pages not traceable to a goal are removed.

## Inputs

- `site/strategy.md` — approved Phase 1 output
- `process/templates/page-brief.template.md` — template for each page brief

## Outputs

- `site/sitemap.md` — full page list with URL slugs, parent/child hierarchy, and one-line purpose per page
- `site/page-briefs/<slug>.md` — one file per page (use `page-brief.template.md`)

## Process

1. List every goal from `site/strategy.md`. For each goal, ask: "what page or pages does a user
   need in order to take the action that satisfies this goal?" Build the page list from the answers.
   Do not start from "what websites usually have."

2. Assign each page a URL slug. Rules:
   - Lowercase, hyphens only (no underscores, no camelCase, no special characters)
   - No dates or version numbers in slugs
   - Slugs must be stable — changing them after GATE 1 requires a redirect plan
   - Descriptive of content, not of navigation position ("what-we-do" is wrong; "services" or
     "platform" is better if that is the primary term users search)

3. Define the hierarchy: which pages are top-level routes, which are children. Capture this in
   `site/sitemap.md` with indentation showing parent/child and a one-line purpose per page.

4. Write one brief per page (`site/page-briefs/<slug>.md`). Each brief must contain:
   - **Purpose:** what goal this page serves and what user job it completes
   - **Primary audience:** which persona from strategy.md arrives here most often
   - **Primary message:** one sentence — the single most important thing this page must communicate
     (one message per page; if you have two, you have two pages)
   - **Section outline:** ordered list of sections by name (no copy yet — just section names and a
     one-line description of each section's job)
   - **Primary CTA:** one action per page — the next step you want the user to take; label and
     destination (URL or section anchor)
   - **SEO intent:**
     - Target query: one primary keyword phrase the page should rank for
     - Draft title: ≤ 60 characters, includes the target query naturally
     - Draft meta description: ≤ 155 characters, states the value + the action, no keyword stuffing

5. Plan internal links: for each page, list which other pages it should link to and why (user job
   continuation, not just navigation). Add a cross-reference section to `site/sitemap.md`.

6. Check every page brief for the one-message rule. If a brief has two primary messages, split it
   into two pages or demote one message to a secondary section with no competing CTA.

7. Verify `process/checklists/phase-2-ia.md` before declaring Phase 2 done.

## Quality bar

- Every page in the sitemap can be justified by citing a goal from `site/strategy.md`.
- No two page briefs share the same primary message.
- Every URL slug is lowercase, hyphenated, contains no dates, and would still make sense in three years.
- Every draft title is ≤ 60 characters; every meta description is ≤ 155 characters; neither reads
  as a keyword list.
- Every page has exactly one primary CTA with a label and a destination.
- The internal linking plan connects pages by user journey, not just by site structure.
- The section outlines are detailed enough that a copywriter needs no further clarification to begin.

## Anti-patterns

- **Do not copy a generic site structure.** "About, Services, Blog, Contact" is a template, not
  an IA. Derive pages from goals; remove any page that cannot be traced to one.
- **Do not assign two primary messages to one page.** Secondary messages dilute the primary. Add
  a section, not a second primary.
- **Do not use placeholder SEO fields.** "Best product in industry" is not a target query. Use the
  language your personas actually search for.
- **Do not write copy in the section outline.** Section names and job descriptions only — copy belongs
  in Phase 3. Premature copy in briefs causes drift between brief and final copy.
- **Do not use unstable slugs.** Date-based or version-based slugs break SEO and require redirects.
  Once GATE 1 approves slugs, treat them as contracts.
- **Do not plan more pages than the scope allows.** If the strategy scoped 6 pages, produce 6 briefs.
  New pages require explicit scope expansion — raise it at GATE 1, not after.

## Done when

`process/checklists/phase-2-ia.md` is fully satisfied. **GATE 1 follows** — update `STATE.md` to
`blocked-pending-review`, list `site/strategy.md`, `site/sitemap.md`, and all `site/page-briefs/*.md`
as review artifacts, fill `process/templates/review-request.template.md`, output `REVIEW_GATE_1`,
and stop. Changes at GATE 1 are the cheapest of the entire project.
