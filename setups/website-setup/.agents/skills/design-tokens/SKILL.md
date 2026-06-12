---
name: design-tokens
description: Use at Phase 5 to scaffold the Next.js application and translate strategy personality into a two-layer token system that is the single source of every visual value in the project.
---
# Design Tokens

## Purpose

Create the visual foundation the rest of the build depends on. Every color, size, weight, radius,
shadow, and breakpoint originates here as a named, documented token. No raw value ever appears in
a component. Rebranding must be a token edit, never a component refactor.

## Inputs

- `site/strategy.md` — tone adjectives, site language (influences type choices), brand references
- `docs/stack-conventions.md` — scaffolding commands, file conventions, Tailwind v4 setup
- GATE 2 approval in `STATE.md` (required — do not begin this phase until confirmed)

## Outputs

- `design/tokens.json` — W3C DTCG format, source of truth for all token values
- `app/globals.css` — Tailwind v4 `@theme` block mirroring all tokens as CSS custom properties
- `design/DECISIONS.md` — rationale: which strategy adjectives drove which token choices

## Process

1. **Scaffold the Next.js app first.** Follow `docs/stack-conventions.md` exactly. This is the
   first code written in the project. Run the scaffold command, verify the dev server starts
   (`pnpm dev`), and commit the scaffolded state before touching any token files. Do not modify
   the app structure beyond what the conventions specify.

2. **Define primitive tokens** in `design/tokens.json` using W3C DTCG format. Primitives are
   raw values with no semantic meaning — they are referenced only by semantic tokens, never by
   components. Required namespaces:
   - `--color-*` — full palette in `oklch(L C H)` notation (oklch is perceptually uniform; use
     it so lightness steps are predictable). Define enough stops to support semantic aliases:
     typically 9–11 steps per hue (50/100/200…900/950).
   - `--font-*` — font family stacks by role (e.g., `--font-sans`, `--font-mono`)
   - `--text-*` — type scale sizes (e.g., `--text-xs` through `--text-5xl`) with matching
     line-height pairs
   - `--spacing-*` — spacing scale (e.g., 4px base unit, steps: 1/2/3/4/6/8/12/16/24/32/48/64)
   - `--radius-*` — border radius scale (none/sm/md/lg/full)
   - `--shadow-*` — elevation scale (none/sm/md/lg)
   - `--breakpoint-*` — viewport breakpoints (sm/md/lg/xl/2xl) matching Tailwind defaults unless
     overridden with justification

3. **Derive the palette from strategy adjectives.** Open `site/strategy.md` and read the tone
   adjectives. For each adjective, make a documented choice: "authoritative → deep navy primary,
   low saturation, high contrast." Document every derivation in `design/DECISIONS.md`.

4. **Define semantic tokens** in `design/tokens.json` as aliases referencing primitives. Required
   semantic names (adapt values to the project):
   - `--color-primary`, `--color-primary-hover`, `--color-primary-foreground`
   - `--color-secondary`, `--color-secondary-hover`, `--color-secondary-foreground`
   - `--color-surface`, `--color-surface-raised`, `--color-surface-overlay`
   - `--color-text`, `--color-text-muted`, `--color-text-inverse`
   - `--color-border`, `--color-border-strong`
   - `--color-success`, `--color-warning`, `--color-error` (with foreground variants)
   - `--color-focus-ring` — used by all focus-visible states
   - `--font-body`, `--font-heading`, `--font-code`
   - `--text-body`, `--text-heading-*` (map to scale steps)
   - `--spacing-section` (vertical padding between page sections)

5. **Mirror all tokens in `app/globals.css`** as a Tailwind v4 `@theme` block. Every CSS custom
   property defined in `design/tokens.json` must appear here under `:root` and inside `@theme`.
   The `@theme` block is what Tailwind v4 reads for utility generation. Primitives and semantics
   both go in — components will use semantic names; Tailwind utilities will expose both.

6. **Pre-check contrast** at the token level before writing any component. For every
   `foreground`/`background` semantic pair, calculate contrast ratio using the WCAG formula.
   Require ≥ 4.5:1 for normal text (AA), ≥ 3:1 for large text and UI components. Log results
   in `design/DECISIONS.md` under "Contrast audit." Adjust primitive stops until all pairs pass.
   Do not defer this to QA — a failing pair here means every component using it fails.

7. **Document every decision** in `design/DECISIONS.md`:
   - Which strategy adjective drove which palette choice
   - Which typeface was chosen and why (personality, language support, licensing)
   - Why the spacing scale base unit was chosen
   - Contrast ratios for every semantic foreground/background pair
   - Any token that was requested by a wireframe that wasn't derivable from strategy

8. Verify `process/checklists/phase-5-tokens.md` before declaring Phase 5 done.

## Quality bar

- Every value in `design/tokens.json` uses a DTCG-valid structure (`$value`, `$type` keys).
- Every semantic token references a primitive token — no raw values in semantic definitions.
- The `app/globals.css` `@theme` block contains every token from `design/tokens.json`.
- All semantic foreground/background pairs pass WCAG AA contrast (≥ 4.5:1 for text).
- `design/DECISIONS.md` traces every color choice to a strategy adjective.
- `pnpm dev` runs without error after scaffolding and after adding tokens.
- oklch is used for all color tokens — no hex, hsl, or rgb in `design/tokens.json`.

## Anti-patterns

- **Do not use raw values in semantic tokens.** `--color-primary: oklch(0.4 0.2 250)` is a
  primitive definition. `--color-primary: var(--color-blue-700)` is correct semantic aliasing.
- **Do not skip the contrast pre-check.** Tokens with failing contrast will propagate failures
  through every component and page. Fixing a token here takes seconds; fixing it after GATE 3
  requires touching every component.
- **Do not invent tokens that are not demanded by the strategy or wireframes.** Speculative tokens
  that no component ever uses become dead weight and source of confusion.
- **Do not start building components before tokens are stable.** If you discover you need a token
  mid-Phase 6, add it to `design/tokens.json` and `app/globals.css` first, then use it.
- **Do not reference primitive tokens in component code.** Components see only semantic tokens.
  The primitive layer is a convenience for the token author, not an API for components.
- **Do not scaffold the app without following `docs/stack-conventions.md` exactly.** Diverging
  from conventions creates drift that breaks every subsequent phase's assumptions.

## Done when

`process/checklists/phase-5-tokens.md` is fully satisfied. No gate follows Phase 5 — continue
directly to Phase 6 (UI primitives). Tokens and primitives are reviewed together at GATE 3.
