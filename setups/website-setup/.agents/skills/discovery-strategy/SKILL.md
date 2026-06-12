---
name: discovery-strategy
description: Use at Phase 1 to convert a human-written brief into a concrete, written strategy document that every later phase can rely on without re-asking the human.
---
# Discovery & Strategy

## Purpose

Extract testable decisions from a thin brief so that goals, audiences, messaging, tone, scope,
and performance budgets are written down before any page or copy work begins. A vague brief is
not a blocker — it is a list of questions to resolve in `site/strategy.md`.

## Inputs

- `site/BRIEF.md` — filled by the human (required; ask if missing or fewer than ~100 words of substance)
- Any competitor or reference URLs listed in the brief (fetch if web access is available)

## Outputs

- `site/strategy.md` (use template `process/templates/strategy.template.md`)

## Process

1. Read `site/BRIEF.md` in full. List every fact stated explicitly (business, product, audience,
   differentiator, goal, site language, constraints). This becomes the "known" column.

2. List every decision the rest of the build needs that the brief does not answer. These are
   assumptions you will make — state them explicitly in `strategy.md` under "Assumptions". Every
   assumption is a question the human can correct at GATE 1.

3. If reference/competitor URLs are named, visit each one. Note: primary audience signal, tone
   register, structural patterns, and claims to position against. Do not copy; derive contrast.

4. Define **goals** as outcomes with a measurement proxy: e.g. "generate demo requests — tracked
   via form submission event" or "reduce support volume — tracked via documentation page visits".

5. Define **personas** as situation-based profiles, not demographic segments. For each persona:
   - Name the situation they are in when they arrive ("evaluating two vendors before a board sign-off")
   - Name the primary job they are trying to do ("confirm the product handles X")
   - Name 2–3 objections they arrive with ("is this secure enough for enterprise?")
   - Name the outcome they want from the site ("leave with enough confidence to book a call")

6. Write 3–5 **messaging pillars** — the distinct value claims the site owns. Each pillar is one
   sentence, present tense, specificity required. Do not write pillars as slogans; write them as
   claims that can be verified: "Processing happens on-device; no data leaves the user's machine."

7. Define **tone of voice** as 4–6 adjectives drawn from the brief and business context. For each
   adjective, write one "sounds like" example sentence and one "never sounds like" counter-example.

8. Set **measurable budgets** in strategy:
   - Performance: Lighthouse performance ≥ 90 mobile (default), or override from brief
   - Accessibility: WCAG 2.2 AA minimum; Lighthouse a11y ≥ 95 (default)
   - Scope: exact page count and list of pages in scope (derive from goals, not from "what sites have")
   - Site language: one primary language; note if multi-language is in scope and defer it explicitly

9. Write `site/strategy.md` using the template. Fill every section. Where the brief was silent,
   insert the assumption with a `[ASSUMPTION]` tag so it is visually scannable at review.

10. Verify `process/checklists/phase-1-strategy.md` — every item must be satisfiable from the
    written strategy before you declare Phase 1 done.

## Quality bar

- Every section of `strategy.md` contains a real decision, not a placeholder or hedging phrase.
- Each persona names a specific situation and at least two objections — not age ranges or job titles alone.
- Each messaging pillar can be falsified — it makes a claim that a competitor could dispute.
- Tone adjectives have concrete examples, not just labels.
- Performance and accessibility budgets are numeric and written down.
- Every gap in the brief is tagged `[ASSUMPTION]` and listed under "Assumptions" for human review.
- The scope section lists pages explicitly — no vague "as needed".

## Anti-patterns

- **Do not invent the business.** If the brief omits a core fact (what the product does, who it
  serves), ask — never fill it from imagination.
- **Do not write demographic personas.** "35–45-year-old marketing manager" is useless. Situations
  and objections drive copy; demographics do not.
- **Do not write pillars as taglines.** "We put customers first" is not a pillar. A pillar is a
  substantive claim the rest of the copy will elaborate.
- **Do not skip the assumptions list.** Silent assumptions become invisible bugs. If the human
  never reviews them, they compound across every later phase.
- **Do not set scope loosely.** "A few pages" is not a scope. List every page. Unknown pages are
  listed as "TBD — requires human confirmation" with a reason.
- **Do not begin Phase 2 with unanswered assumption questions that would change the page set.**
  Flag those at GATE 1 explicitly.

## Done when

`process/checklists/phase-1-strategy.md` is fully satisfied. No gate follows Phase 1 — continue
directly to Phase 2. If you have open questions that could change the IA, surface them in the
Phase 2 review request rather than blocking Phase 1 completion.
