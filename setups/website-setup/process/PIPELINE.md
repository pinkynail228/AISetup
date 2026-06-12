# PIPELINE — the phased website build

This file is the source of truth for the process. It never changes during a build; `STATE.md` tracks position in it. Read the section for your current phase before doing any work, then read the phase skill.

```
1 Strategy → 2 IA → [GATE 1] → 3 Copy → 4 Validation & wireframes → [GATE 2]
→ 5 Tokens → 6 Primitives → [GATE 3] → 7 Assembly → 8 QA → [GATE 4] → 9 Launch
```

A gate closes a **phase group**. Nothing from a later group may begin while a gate is open. The gate mechanics (STOP, review request, approval logging) are defined in `AGENTS.md → Review gate protocol`.

**Iteration rule.** If a change request arrives after a gate was already approved: reopen the earliest phase that owns the change, record it under `Reopened phases` in `STATE.md`, redo the dependent artifacts downstream, and re-request every gate whose phase group was touched. Earlier approved gates stand unless their own artifacts changed. Worked example — a copy change requested after GATE 3: reopen Phase 3 for the affected page, re-validate it in Phase 4, re-request **GATE 2** for the changed pages; **GATE 3 stands** (the visual language is untouched); if Phase 7 had already assembled those pages, re-assemble them after GATE 2 closes and continue to GATE 4 as usual.

---

## Phase 1 — Discovery & Strategy

**Purpose:** turn the human's brief into concrete, testable strategic decisions. "Philosophy" becomes written choices the rest of the build can rely on.

- **Entry:** `site/BRIEF.md` filled by the human. If missing or too thin — ask questions in chat first; never invent a business.
- **Skill:** `.agents/skills/discovery-strategy/SKILL.md`
- **Steps:** analyze the brief → review competitor/reference sites named in it (if web access is available) → define goals, audiences/personas, value proposition, messaging pillars, tone of voice, success metrics, scope (target page set size), site language, performance & accessibility budgets → explicitly list every assumption made where the brief was silent.
- **Artifacts:** `site/strategy.md` (template: `process/templates/strategy.template.md`)
- **Exit:** `process/checklists/phase-1-strategy.md` fully satisfied.
- **Gate:** none — continue to Phase 2.

## Phase 2 — Information Architecture

**Purpose:** decide the page set and what each page must achieve — before a single sentence of copy.

- **Entry:** Phase 1 exit criteria met.
- **Skill:** `information-architecture`
- **Steps:** derive the page list from strategy → build `site/sitemap.md` with URL slugs and hierarchy → write one brief per page: purpose, primary audience, primary message, section outline, primary CTA, SEO intent (target query, draft title and meta description) → plan internal linking.
- **Artifacts:** `site/sitemap.md`, `site/page-briefs/<slug>.md` (template: `page-brief.template.md`)
- **Exit:** `process/checklists/phase-2-ia.md` satisfied.
- **Gate:** **GATE 1** — review of strategy + sitemap + page briefs. Changes here are the cheapest of the whole project.

## Phase 3 — Copywriting

**Purpose:** write the full, real copy for every page. Copy defines structure.

- **Entry:** GATE 1 approved (logged in `STATE.md`).
- **Skill:** `website-copywriting`
- **Steps:** for each page (most important first): write complete copy per its page brief — headlines, subheads, body, CTAs, microcopy (buttons, form labels, empty states, footer) — in the site language from `site/strategy.md`; keep one voice and one message hierarchy across pages.
- **Artifacts:** `site/copy/<slug>.md` (template: `copy-page.template.md`)
- **Exit:** `process/checklists/phase-3-copy.md` satisfied.
- **Gate:** none — validation comes next.

## Phase 4 — Copy validation & lo-fi wireframes

**Purpose:** prove the copy works structurally before any visual design exists.

- **Entry:** Phase 3 done.
- **Skills:** `copy-validation`, then `lofi-wireframes`
- **Steps:** validate every page against strategy and its brief — message match, heading hierarchy (exactly one H1, logical H2/H3), scannability, CTA clarity, length budgets — and record findings → fix the copy → build a lo-fi wireframe per page: a markdown section skeleton that maps every copy block to a named section slot in mobile-first order.
- **Artifacts:** `site/copy/VALIDATION.md` (findings and resolutions), `site/wireframes/<slug>.md` (template: `wireframe.template.md`)
- **Exit:** `process/checklists/phase-4-wireframes.md` satisfied.
- **Gate:** **GATE 2** — review of copy + wireframes. Several iterations are expected here; re-run validation after every edit round. Visual work is forbidden until this gate is approved. On approval, set `status: approved` in every `site/copy/*.md` header before starting Phase 5.

## Phase 5 — Design tokens

**Purpose:** translate the strategy's personality into a token system — the single source of every visual value.

- **Entry:** GATE 2 approved.
- **Skill:** `design-tokens`
- **Steps:** scaffold the Next.js app per `docs/stack-conventions.md` (this is the first code of the project) → define primitive tokens (color palette in `oklch`, type scale, spacing scale, radii, shadows, breakpoints) in `design/tokens.json` (W3C DTCG format) → mirror them as a Tailwind v4 `@theme` block in `app/globals.css` → define the semantic layer (`--color-primary`, `--color-surface`, `--color-text`, …) referencing primitives → record the rationale (strategy adjectives → visual choices) in `design/DECISIONS.md`.
- **Artifacts:** `design/tokens.json`, `app/globals.css`, `design/DECISIONS.md`
- **Exit:** `process/checklists/phase-5-tokens.md` satisfied.
- **Gate:** none — primitives are built on top first, then reviewed together.

## Phase 6 — UI primitives

**Purpose:** the smallest reusable parts of the interface, consuming tokens only.

- **Entry:** Phase 5 done.
- **Skill:** `ui-primitives`
- **Steps:** build the primitive set — Button, Heading, Text, Link, Container, Stack, Grid, Card, Input/Field, Badge, plus anything the wireframes demand → token-only styling, accessibility built in (roles, focus, keyboard) → build a `/styleguide` page rendering every primitive in every variant and state.
- **Artifacts:** `components/primitives/*`, `app/styleguide/page.tsx`
- **Exit:** `process/checklists/phase-6-primitives.md` satisfied.
- **Gate:** **GATE 3** — the human reviews the visual language on `/styleguide` (dev server or screenshots) together with `design/DECISIONS.md`. Token changes here cascade cleanly; that is the point of reviewing now.

## Phase 7 — Page assembly

**Purpose:** compose approved copy and approved primitives into real pages. Zero new decisions.

- **Entry:** GATE 3 approved.
- **Skill:** `page-assembly`
- **Steps:** build section components matching wireframe slots → assemble pages in the App Router, taking copy **verbatim** from `site/copy/` → responsive behavior follows the wireframe's mobile-first order → set metadata (title, description, OG) from page briefs via the Metadata API → wire internal links per the IA plan.
- **Rules:** missing copy, missing primitive, or a needed-but-undefined style → **STOP and raise it**. Never invent content or visual styles in this phase.
- **Artifacts:** `app/` routes, `components/sections/*`
- **Exit:** `process/checklists/phase-7-assembly.md` satisfied.
- **Gate:** none — QA first, then the final gate.

## Phase 8 — QA & accessibility

**Purpose:** verify the build against the budgets and the approved artifacts.

- **Entry:** Phase 7 done.
- **Skill:** `qa-launch`
- **Steps:** `pnpm lint`, `pnpm typecheck`, `pnpm build` all pass → Lighthouse against the budgets from `site/strategy.md` (defaults: performance ≥ 90 mobile, accessibility ≥ 95) → axe accessibility checks → manual keyboard navigation walkthrough → responsive check at every breakpoint token → copy fidelity check (rendered text matches approved copy verbatim) → metadata/OG validation → internal link check.
- **Artifacts:** `reports/qa.md` (every finding + how it was fixed)
- **Exit:** `process/checklists/phase-8-qa.md` satisfied.
- **Gate:** **GATE 4** — final review of the whole site plus the QA report.

## Phase 9 — Launch

**Purpose:** ship deliberately. Launch is a checklist, not a button.

- **Entry:** GATE 4 approved.
- **Skill:** `qa-launch`
- **Steps:** work through the launch checklist — env vars, analytics, `sitemap.xml` + `robots.txt`, redirects (if replacing an existing site), favicon + OG images, 404 page, form delivery test, domain/SSL → deploy (propose Vercel unless the human chose otherwise) → post-deploy smoke checks on the live URL → complete `reports/launch-checklist.md`.
- **Exit:** `process/checklists/phase-9-launch.md` satisfied. Project done; hand over with a short summary of where everything lives.
