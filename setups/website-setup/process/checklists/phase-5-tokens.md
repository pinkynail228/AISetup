# Definition of Done — Phase 5: Design Tokens

Every box checked before closing the phase and moving to Phase 6.

- [ ] The Next.js app is scaffolded per `docs/stack-conventions.md` and `pnpm dev` starts without errors.
- [ ] `design/tokens.json` exists and conforms to the W3C DTCG token format (each token has at minimum `$value` and `$type`).
- [ ] The primitive color palette in `design/tokens.json` uses `oklch` values exclusively — no hex, rgb, or hsl in the primitives layer.
- [ ] A semantic layer is defined in `design/tokens.json` with tokens for at minimum: `color-primary`, `color-surface`, `color-text`, `color-text-muted`, `color-border`, and `color-accent`; each semantic token references a primitive token, not a raw value.
- [ ] A type scale is defined in `design/tokens.json` covering at minimum 5 size steps, with tokens for font families, and line-height and letter-spacing for heading and body roles.
- [ ] A spacing scale is defined in `design/tokens.json` as a numeric progression with at minimum 6 steps; all spacing tokens use a consistent base unit.
- [ ] Border-radius, shadow, and breakpoint tokens are defined in `design/tokens.json`.
- [ ] Every token defined in `design/tokens.json` is mirrored as a CSS custom property in the `@theme` block in `app/globals.css`; no token is present in one file but absent from the other.
- [ ] `design/DECISIONS.md` exists and traces each major visual choice (color mood, type choice, spacing feel) back to a specific tone adjective or requirement in `site/strategy.md`.
- [ ] No raw hex, rgb, hsl, or pixel value appears anywhere in `app/globals.css` outside the `@theme` block's token definitions — semantic aliases only elsewhere.
- [ ] `STATE.md` is updated: Phase 5 status set to `done`, completion date recorded.
