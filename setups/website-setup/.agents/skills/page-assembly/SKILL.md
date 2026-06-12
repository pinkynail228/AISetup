---
name: page-assembly
description: Use at Phase 7 to compose approved copy and approved primitives into real Next.js pages that exactly match the wireframe contracts, inserting copy verbatim and inventing nothing.
---
# Page Assembly

## Purpose

Assemble the site from already-approved parts. Phase 7 makes zero new decisions about content or
style. Every word comes from `site/copy/`; every visual element comes from `components/primitives/`;
every section follows `site/wireframes/`. If anything is missing, stop and raise it — never improvise.

## Inputs

- `site/wireframes/<slug>.md` — section slot order and copy references (the assembly contract)
- `site/copy/<slug>.md` — approved copy, inserted verbatim
- `site/page-briefs/<slug>.md` — metadata: title, meta description, OG details, CTA, internal links
- `site/sitemap.md` — internal link plan
- `components/primitives/*` — the only styling API available
- GATE 3 approval confirmed in `STATE.md`

## Outputs

- `app/<slug>/page.tsx` (and `app/page.tsx` for home) — Next.js App Router page files
- `components/sections/*` — section components, one per wireframe slot type

## Process

1. For each page in `site/sitemap.md`, open the wireframe (`site/wireframes/<slug>.md`) and list
   every slot in mobile-first order. This is your build sequence for that page.

2. For each slot, create or reuse a **section component** in `components/sections/`. Name the
   component file after the slot name (e.g., `hero.tsx`, `feature-grid.tsx`, `primary-cta.tsx`).
   A slot type that appears on multiple pages gets one shared component with props for the varying
   copy — do not create duplicate section components for the same slot type.

3. Build each section component using **only primitives from `components/primitives/`** for
   visual output. Responsive behavior follows the wireframe's layout hint: if the hint says
   "1-col mobile, 3-col desktop," use `<Grid cols={...}>` with the responsive breakpoint prop.
   No raw CSS values, no `style` props with hardcoded values, no Tailwind utilities that bypass
   the token system.

4. **Insert copy verbatim.** Open `site/copy/<slug>.md`, locate the section referenced by the
   wireframe slot's copy reference (`<slug>#<section-id>`), and copy the text exactly as written.
   - No paraphrasing
   - No "cleaning up" punctuation or capitalization
   - No shortening for layout fit
   - No adding words not present in the copy file

   If the copy does not fit the section visually (too long, too short, wrong structure), **STOP.**
   Do not edit copy in this phase. Log the issue with a specific description (which page, which
   section, what the problem is) and reopen Phase 3 for that page per the iteration rule in
   `process/PIPELINE.md`. Update `STATE.md` to reflect the reopening.

5. **Set page metadata** using the Next.js Metadata API in each page file:
   - `title`: from the page brief's "Draft title" field
   - `description`: from the page brief's "Draft meta description" field
   - `openGraph.title` and `openGraph.description`: same values unless the brief specifies separate OG copy
   - `openGraph.type`: "website" for most pages
   - `canonical`: the page's URL slug
   Metadata must be a proper `export const metadata: Metadata` object or a `generateMetadata` function —
   never hardcoded into JSX head elements.

6. **Wire internal links** per `site/sitemap.md`. Every link target defined in the IA plan must
   be present as a `<Link>` primitive with the correct `href`. Verify that every href in the
   sitemap's internal linking plan has a corresponding page in `app/`.

7. **Assemble the page file** by importing the section components in wireframe slot order and
   rendering them inside a wrapping `<main>` element with a unique `id`. Ensure the first
   focusable element on the page is the skip-to-content link pointing to `#main-content`, or
   that the layout component handles it globally — check `docs/stack-conventions.md`.

8. **The "invent nothing" discipline — exact stop-and-raise behavior:**
   - Missing copy (copy file exists but section is absent) → log to `STATE.md`, reopen Phase 3 for
     that page, do not write placeholder text
   - Missing primitive (a slot needs a component type not yet in `components/primitives/`) → log
     to `STATE.md`, reopen Phase 6 for that primitive, do not write inline styles as a stand-in
   - Needed-but-undefined token (a layout need has no semantic token) → log to `STATE.md`, reopen
     Phase 5 for the token, do not use a raw value
   - In every case: state the gap precisely, stop that page's assembly, continue assembling other
     pages if their dependencies are satisfied

9. **Build the 404 page** at `app/not-found.tsx` using the approved copy from `site/copy/404.md`
   verbatim — heading, body line, and the link home via the `<Link>` primitive. The 404 page is
   not in the sitemap but is mandatory.

10. **Create OG images.** For every page, place an OG image at `public/og/<slug>.png` (1200×630)
    and point that page's `og:image` metadata to it. Compose them strictly from the approved
    visual language (tokens, fonts) — no new visual decisions beyond what GATE 3 approved.

11. After all pages are built, do a final cross-check:
   - Every page in `site/sitemap.md` has a corresponding route in `app/`
   - Every internal link in the sitemap plan is wired
   - Every page has `export const metadata` with title and description
   - Every page's `og:image` points to an existing file in `public/og/`

12. Verify `process/checklists/phase-7-assembly.md` before declaring Phase 7 done.

## Quality bar

- Every rendered text string on every page is traceable to a line in `site/copy/`.
- No section component contains a raw color, spacing, or layout value — only semantic tokens via
  primitives.
- Every page exports correct `metadata` with title ≤ 60 chars and description ≤ 155 chars.
- Every internal link in the IA plan is present and resolves to an existing route.
- `pnpm build` completes with no errors.
- The mobile-first slot order from each wireframe is preserved in the rendered DOM order.

## Anti-patterns

- **Do not paraphrase or "improve" copy during assembly.** If copy is wrong, raise it and reopen
  Phase 3. Copy correctness is the human's approval at GATE 2, not the assembler's judgment.
- **Do not write layout-specific copy adjustments.** "Shortened for mobile" is not valid. Copy
  is responsive-agnostic; layout adaptation is the section component's job.
- **Do not use inline styles or raw Tailwind values to work around missing tokens.** The token
  system is infrastructure. Bypassing it corrupts the rebranding guarantee.
- **Do not create duplicate section components for the same slot type.** If `hero` appears on
  three pages, there is one `hero.tsx` with props for the varying copy, not three files.
- **Do not add decorative content not present in the copy files.** Stock photos, illustration
  placeholders, and "dummy stats" are invented content. Nothing goes on the page unless it was
  approved at GATE 2.
- **Do not set metadata values without consulting the page brief.** Inventing titles or
  descriptions breaks SEO integrity and creates a discrepancy between the approved IA and the
  shipped page.

## Done when

`process/checklists/phase-7-assembly.md` is fully satisfied. No gate follows Phase 7 — continue
directly to Phase 8 (QA). Any gap that caused a phase reopen must be resolved and the affected
phase re-checked before Phase 8 begins.
