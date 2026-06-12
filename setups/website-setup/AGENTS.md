# AGENTS.md — Website Build Agent

## What this repository is

A phased website-build workspace. You (the agent) build a complete marketing/company website in **9 phases with 4 mandatory human review gates**. The process is the product: every phase produces reviewable artifacts, and visual work never starts before content is approved.

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4. Conventions: `docs/stack-conventions.md`.

## Session start protocol — ALWAYS do this first

1. Read `STATE.md` — current phase, status, pending approvals.
2. Read `process/PIPELINE.md` — the section for your current phase (entry criteria, steps, artifacts, exit criteria).
3. Read the skill for the current phase (see Phase map below; skills live in `.agents/skills/`). If `STATE.md` says Phase 0, there is no skill yet — verify `site/BRIEF.md` is filled and start Phase 1.
4. If `STATE.md` says `blocked-pending-review` — do NOT touch files. Ask the human for their review decision.
5. Never skip ahead. Never start a phase whose entry criteria are not met.

## Phase map

| Phase | Name | Skill(s) | Key artifacts | Gate after |
|---|---|---|---|---|
| 1 | Discovery & Strategy | `discovery-strategy` | `site/strategy.md` | — |
| 2 | Information Architecture | `information-architecture` | `site/sitemap.md`, `site/page-briefs/*.md` | **GATE 1** |
| 3 | Copywriting | `website-copywriting` | `site/copy/*.md` | — |
| 4 | Copy validation & lo-fi wireframes | `copy-validation`, `lofi-wireframes` | `site/copy/VALIDATION.md`, `site/wireframes/*.md` | **GATE 2** |
| 5 | Design tokens | `design-tokens` | `design/tokens.json`, `app/globals.css`, `design/DECISIONS.md` | — |
| 6 | UI primitives | `ui-primitives` | `components/primitives/*`, `/styleguide` page | **GATE 3** |
| 7 | Page assembly | `page-assembly` | `app/` routes, `components/sections/*` | — |
| 8 | QA & accessibility | `qa-launch` | `reports/qa.md` | **GATE 4** |
| 9 | Launch | `qa-launch` | `reports/launch-checklist.md` | — |

## Review gate protocol — MANDATORY

Gates are hard stops. When you complete the last phase before a gate:

1. Update `STATE.md`: status `blocked-pending-review`, list the artifacts to review.
2. Fill `process/templates/review-request.template.md` and output it in chat.
3. Output the marker `REVIEW_GATE_<N>` and **STOP. Do not modify any files. Do not begin the next phase.**
4. Resume ONLY after the human replies with explicit approval — "approved", "утверждаю", or equivalent. Record the decision and date in the STATE.md approvals log.
5. If the human requests changes: apply them **within the current phase group**, update artifacts, re-request review. Iteration at a gate is normal and expected.

Treat "continue", "ok, what's next?" or silence as **NOT approval** — ask directly.

## Hard rules

- **Content before chrome.** No visual design work (tokens, components, styling) before GATE 2 is approved.
- **No lorem ipsum.** No placeholder text anywhere, at any phase, ever.
- **Tokens only.** Every color, spacing, radius, shadow and font value comes from a token. Components reference semantic tokens, never raw hex/px values.
- **Assembly invents nothing.** Pages (Phase 7) are composed ONLY from approved copy and approved primitives. If something is missing — STOP and raise it; never improvise content or styles.
- **Accessibility is the floor.** Semantic HTML, WCAG 2.2 AA, full keyboard navigation, visible focus states.
- **Mobile-first.** Design and build from the smallest breakpoint up.
- **Decisions live in files.** If a decision matters, write it into the relevant artifact. Chat is for questions; files are for truth.
- **When unsure — ask.** List open questions in the review request instead of guessing silently.

When two options conflict, `MANIFESTO.md` decides.

## Language policy

- Process artifacts (strategy, briefs, reports, code comments) — English.
- Website copy (`site/copy/*`) — the site language defined in `site/strategy.md`.
- Chat with the human — mirror the human's language.

## Commands

The Next.js app is scaffolded at the start of Phase 5 (see `docs/stack-conventions.md`). After that:

- `pnpm dev` — dev server
- `pnpm lint` — ESLint
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm build` — production build (must pass before GATE 4)

## Project structure

- `site/` — brief, strategy, sitemap, page briefs, copy, wireframes (markdown; Phases 1–4)
- `design/` — `tokens.json` (DTCG source of truth), `DECISIONS.md`
- `app/`, `components/` — Next.js application (Phases 5–9)
- `process/` — `PIPELINE.md`, per-phase checklists, artifact templates
- `.agents/skills/` — how-to skill for each phase
- `reports/` — QA report, launch checklist
- `MANIFESTO.md` — quality principles (conflict resolver)
- `STATE.md` — current phase, status, approvals log (you maintain it)

## When stuck

Do not make speculative large changes. Prefer small, reviewable steps. Write open questions into the review request or ask directly in chat. If the brief (`site/BRIEF.md`) is missing or too thin to work with — ask the human to fill it before starting Phase 1.
