# Definition of Done — Phase 6: UI Primitives

Every box checked before requesting GATE 3.

- [ ] Every primitive component required by the wireframes exists in `components/primitives/` — cross-reference every content-type label in every wireframe file; no wireframe demands a component that does not exist.
- [ ] The core primitive set is complete: Button (all variants and sizes used in wireframes), Heading (H1–H4), Text (body, muted, small), Link, Container, Stack, Grid, Card, and any Input/Field and Badge variants referenced in copy microcopy blocks.
- [ ] Every primitive component references only semantic token CSS custom properties (e.g., `var(--color-primary)`) — no raw hex, rgb, hsl, pixel, or rem value is hardcoded in any component style.
- [ ] No primitive component imports a primitive token directly; all color and spacing values are semantic.
- [ ] Every interactive primitive (Button, Link, Input) has a visible focus style and is operable by keyboard alone — verified by manual tab-through in the browser.
- [ ] Every primitive meets WCAG 2.2 AA contrast requirements: text on background, icon on background, and focus indicator contrast ratios verified with a contrast checker.
- [ ] The `/styleguide` page renders every primitive in every variant, size, and interactive state (default, hover, focus, disabled, error where applicable) — nothing is missing from the page.
- [ ] `pnpm lint` passes with zero errors on all files in `components/primitives/` and `app/styleguide/`.
- [ ] `pnpm typecheck` passes with zero TypeScript errors on all primitive components.
- [ ] No lorem ipsum or fabricated content appears anywhere in the styleguide page — all labels use real component names and real state descriptions.
- [ ] `process/templates/review-request.template.md` has been filled and posted in chat for GATE 3, with a link or screenshot of `/styleguide` included.
- [ ] `STATE.md` status is set to `blocked-pending-review` with the artifact list for GATE 3 recorded.
- [ ] Marker `REVIEW_GATE_3` has been output in chat.
