---
name: ui-primitives
description: Use at Phase 6 to build the complete set of reusable UI primitives that consume only semantic tokens, with full accessibility built in, and render all variants on a /styleguide page for GATE 3 review.
---
# UI Primitives

## Purpose

Build the smallest reusable building blocks of the interface. Primitives are the only place where
token values translate into visual output. If a value cannot be expressed as a semantic token
reference, it does not belong in a primitive. Pages (Phase 7) are assembled from these primitives —
they are the only styling API Phase 7 may use.

## Inputs

- `app/globals.css` — semantic tokens, Tailwind v4 `@theme` block (Phase 5 output)
- `design/tokens.json` — token reference (for understanding available names)
- `site/wireframes/*.md` — to identify any primitive types demanded by wireframe component hints
- `docs/stack-conventions.md` — component file conventions, import paths, TypeScript patterns
- Phase 5 exit confirmed in `STATE.md`

## Outputs

- `components/primitives/*` — one file per primitive
- `app/styleguide/page.tsx` — the `/styleguide` route rendering every primitive in every variant and state

## Process

1. Read all wireframes in `site/wireframes/` and list every component hint mentioned. Add any
   types not in the standard set to the build list.

2. Build the **standard primitive set** in order (each builds on the previous):
   - `Heading` — h1–h6 via a `level` prop; maps each level to a semantic token (`--text-heading-*`);
     accepts `as` for semantic override (e.g., visually h2, semantically h3)
   - `Text` — body and caption variants; size via prop; maps to `--text-body` and `--text-sm`
   - `Link` — wraps Next.js `<Link>`; variants: default, muted, navigation; focus-visible ring
     using `--color-focus-ring`
   - `Button` — variants: primary, secondary, ghost, destructive; sizes: sm, md, lg; states:
     default, hover, focus-visible, disabled, loading; `as` prop to render as `<a>` when needed
   - `Container` — max-width wrapper; `--spacing-*` horizontal padding; breakpoint-aware
   - `Stack` — vertical flex container; gap via `spacing` prop mapped to `--spacing-*`
   - `Grid` — CSS grid; cols prop (1–12 or named: "2-col", "3-col"); responsive via breakpoint tokens
   - `Card` — surface container; uses `--color-surface-raised`, `--radius-md`, `--shadow-sm`;
     optional header/footer slots; no hardcoded content
   - `Input` / `Field` — Input renders the `<input>` element; Field composes Input with a `<label>`
     and optional helper/error text; label is always visually present and associated via `htmlFor`/`id`
   - `Badge` — small label; variants: default, success, warning, error; maps to semantic status tokens
   - Any additional types demanded by wireframe component hints

3. For each primitive, enforce these **token-only styling rules:**
   - No raw hex, rgb, hsl, or oklch values in component code
   - No primitive token references (e.g., `var(--color-blue-700)`) — only semantic tokens
   - No inline `style` props with raw values
   - Tailwind utility classes are allowed only if they resolve to a `@theme` token (e.g.,
     `text-primary` resolves to `--color-text`); utilities like `text-[#3b82f6]` are forbidden

4. Build **accessibility into every primitive — not as an afterthought:**
   - `Button`: correct `type` attribute default ("button", not "submit"); `aria-disabled` when
     disabled (not `disabled` alone); loading state communicates via `aria-label` or `aria-busy`
   - `Heading`: rendered heading level always matches semantic intent; never a `<div>` with heading styles
   - `Link`: keyboard-navigable; focus-visible ring; external links get `target="_blank"` with
     `rel="noopener noreferrer"` and a visually-hidden " (opens in new tab)" or equivalent
   - `Input`/`Field`: label always associated; `aria-describedby` links error/helper text to input;
     error state does not rely on color alone (icon or text prefix required)
   - All interactive primitives: `:focus-visible` outline using `--color-focus-ring`; no
     `outline: none` without a replacement; 44×44px minimum tap target for touch
   - `Grid` and `Stack`: no `role` needed; never add `aria-*` to layout-only elements

5. Write variants via **props, not class composition at the call site.** Variants are an explicit
   API surface — `<Button variant="secondary">` is correct; `<Button className="bg-secondary">` is
   not. Use `cva` (class-variance-authority) or a typed variant map for variant logic.

6. Use **composition over configuration.** A `Card` with a header is `<Card><CardHeader /><CardBody /></Card>`,
   not `<Card hasHeader={true} headerText="..." />`. Slot-based composition keeps primitives small
   and reusable.

7. Build the **`/styleguide` page** at `app/styleguide/page.tsx`:
   - Render every primitive in every variant and every state (default, hover shown as sibling,
     focus-visible, disabled, loading/error where applicable)
   - Include a section for each primitive with its name as a heading
   - Make focus states visible by including a focused instance (use `autoFocus` or a dedicated
     "focused" static demo element with ring styles applied directly)
   - The styleguide is the GATE 3 review surface — it must show the complete visual language

8. Verify `process/checklists/phase-6-primitives.md` before declaring Phase 6 done.

## Quality bar

- No component file contains a raw color, spacing, or radius value — only semantic token references.
- Every interactive primitive has a visible `:focus-visible` ring using `--color-focus-ring`.
- `Field` always has an associated, visible `<label>` — no placeholder-as-label patterns.
- `Button` disabled state uses `aria-disabled` and is visually distinct without relying on color alone.
- The `/styleguide` page renders every variant of every primitive without runtime errors.
- `pnpm typecheck` and `pnpm lint` pass with no errors after all primitives are written.
- Variant APIs are typed — TypeScript enforces valid variant values at compile time.

## Anti-patterns

- **Do not reference primitive tokens in components.** `var(--color-blue-700)` in a component
  breaks the semantic layer. The component must not know which primitive backs the semantic.
- **Do not use `outline: none` or `outline: 0` without a replacement.** Focus rings are
  accessibility infrastructure. Any suppression requires an equivalent visible replacement.
- **Do not accept `placeholder` as a substitute for `<label>`.** Placeholder text disappears on
  focus and is not accessible to all screen readers. Every field requires a visible label.
- **Do not add `role` or `aria-*` to non-interactive layout components.** `Stack`, `Grid`, and
  `Container` are layout helpers — adding roles to them creates noise for screen reader users.
- **Do not build section-level or page-level components in this phase.** Primitives are atoms:
  Button, Heading, Text, Card. Section components (hero, feature-grid) belong in Phase 7.
- **Do not skip the styleguide page.** The styleguide is the only review surface at GATE 3.
  A missing or partial styleguide means the gate cannot be held.

## Done when

`process/checklists/phase-6-primitives.md` is fully satisfied. **GATE 3 follows** — update
`STATE.md` to `blocked-pending-review`, list `components/primitives/*`, `app/styleguide/page.tsx`,
and `design/DECISIONS.md` as review artifacts (provide dev server access or screenshots of
`/styleguide`), fill `process/templates/review-request.template.md`, output `REVIEW_GATE_3`,
and stop. Token changes approved at GATE 3 cascade cleanly because no page assembly has happened yet.
