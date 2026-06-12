---
name: lofi-wireframes
description: Use at Phase 4 (second half) to build a markdown wireframe for every page that maps validated copy blocks to named section slots in mobile-first order, producing the assembly contract for Phase 7.
---
# Lo-fi Wireframes

## Purpose

Translate approved, validated copy into a structural layout specification. The wireframe defines
what sections exist, in what order, and which copy block fills each slot. It is not a visual
design — no colors, no fonts, no spacing values. It is the contract Phase 7 uses to build pages.

## Inputs

- `site/copy/<slug>.md` — validated copy files (all findings resolved)
- `site/copy/VALIDATION.md` — must be complete (no blank statuses) before wireframing starts
- `site/page-briefs/<slug>.md` — section outlines and CTA definitions
- `process/templates/wireframe.template.md` — output template

## Outputs

- `site/wireframes/<slug>.md` — one wireframe per page

## Process

1. Confirm `site/copy/VALIDATION.md` has no blank or missing statuses. If any copy file has
   unfixed findings or missing entries, do not start wireframing — resolve validation first.

2. For each page, read the copy file and the page brief together. Identify every discrete content
   unit: the H1, each H2-anchored section, each CTA block, any standalone elements (testimonials,
   stat callouts, image+caption pairs, form blocks). These are the content units to be placed.

3. Order the sections in **mobile-first** reading order — the sequence that makes the argument
   most effective on a small screen, where no sidebar or parallel columns exist. On mobile, every
   section is full-width and stacked; the wireframe defines the stack order.

4. For each section slot, write:
   - **Slot name:** a stable, hyphenated identifier (e.g., `hero`, `value-prop`, `feature-grid`,
     `social-proof`, `primary-cta`) — Phase 7 will name components after these
   - **Copy reference:** `<slug>#<section-id>` pointing to the copy block in `site/copy/<slug>.md`
     that fills this slot. Every copy block must appear in exactly one slot. No copy block is left
     unplaced; no slot references copy that does not exist.
   - **Layout hint (optional):** a plain-language note about non-mobile layout, e.g., "2-col on
     desktop: image left, text right" or "3-col grid on tablet+". Layout hints describe structure
     only — no dimensions, no colors, no font sizes.
   - **Component type hint (optional):** a suggestion for the primitive type if obvious, e.g.,
     "uses Card grid" or "uses Stack" — but do not design the component; just name the primitive.

5. Verify that every copy block in `site/copy/<slug>.md` appears in the wireframe exactly once.
   Create a checklist at the bottom of each wireframe file listing each copy block and its assigned
   slot. Leave no copy block unassigned.

6. Verify that the wireframe's slot order reflects the page brief's section outline. If you deviate
   from the outline order, note the reason in the wireframe file — the human may have intentional
   ordering requirements.

7. After all wireframes are written, check cross-page slot naming for consistency: if a "primary-cta"
   slot appears on 6 pages, it should be named identically across all 6. Consistent naming reduces
   Phase 7 component count.

8. Verify `process/checklists/phase-4-wireframes.md` — all items for both validation and
   wireframing passes must be satisfied.

## Wireframe file format

```markdown
# Wireframe: <Page Title> (`/<slug>`)

## Mobile-first slot order

### 1. hero
- Copy: home#hero
- Layout hint: full-width, centered text on mobile; image right on desktop (2-col)
- Component hint: custom Hero section (no existing primitive)

### 2. value-prop
- Copy: home#value-prop
- Layout hint: single column
- Component hint: Stack + Text + Heading

### 3. feature-grid
- Copy: home#features
- Layout hint: 1-col mobile, 3-col desktop
- Component hint: Grid + Card (one card per feature)

### 4. social-proof
- Copy: home#testimonials
- Layout hint: 1-col mobile, 2-col desktop

### 5. primary-cta
- Copy: home#cta
- Layout hint: full-width, centered

## Copy block coverage
- [ ] home#hero → slot 1
- [ ] home#value-prop → slot 2
- [ ] home#features → slot 3
- [ ] home#testimonials → slot 4
- [ ] home#cta → slot 5
```

## Quality bar

- Every copy block in every copy file is assigned to exactly one wireframe slot.
- No slot is filled with copy that does not exist in `site/copy/`.
- No wireframe contains any visual styling decision (no color, font, pixel value, or CSS property name).
- Slot names are stable, hyphenated, lowercase identifiers that could be component names.
- Mobile-first order is defensible — reading the slot names top-to-bottom tells the page's story.
- Layout hints describe structure only ("2-col on desktop"), never aesthetics.

## Anti-patterns

- **Do not make visual design decisions in wireframes.** Color choices, font choices, and spacing
  decisions belong in Phase 5. A wireframe that says "blue button" or "large heading" is out of
  scope and must be stripped.
- **Do not leave copy blocks unplaced.** Every word written in Phase 3 must have a home. Orphaned
  copy is either placed or removed — removal requires a note in `VALIDATION.md`.
- **Do not invent copy in wireframes.** Slot descriptions describe structure. If you need a label
  for a section that has no copy yet, you have a gap — stop and flag it.
- **Do not wire frames to primitives that don't exist yet.** Component hints are suggestions, not
  definitions. Phase 6 defines the actual primitives.
- **Do not start wireframing before validation is complete.** Copy that is still being revised
  will invalidate the wireframe. Finish validation, apply all fixes, then wireframe.
- **Do not merge two page briefs into one wireframe.** One wireframe per page, always.

## Done when

`process/checklists/phase-4-wireframes.md` is fully satisfied (all items — both validation and
wireframe portions). **GATE 2 follows** — update `STATE.md` to `blocked-pending-review`, list
`site/copy/*.md`, `site/copy/VALIDATION.md`, and `site/wireframes/*.md` as review artifacts, fill
`process/templates/review-request.template.md`, output `REVIEW_GATE_2`, and stop. Visual work
is forbidden until GATE 2 is explicitly approved.
