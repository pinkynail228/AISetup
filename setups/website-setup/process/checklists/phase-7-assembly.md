# Definition of Done — Phase 7: Page Assembly

Every box checked before closing the phase and moving to Phase 8.

- [ ] Every page in `site/sitemap.md` has a corresponding route in `app/` with a `page.tsx` file.
- [ ] Every section slot defined in each wireframe file has a corresponding section component in `components/sections/`, and every page route assembles those components in the mobile-first order specified by the wireframe.
- [ ] All body copy, headings, CTA text, and microcopy rendered on every page is taken verbatim from the approved copy file (`site/copy/<slug>.md`) — not paraphrased, not reworded, not shortened.
- [ ] No page contains any text, image alt text, or UI label that does not originate from an approved copy file or an approved primitive label — nothing has been invented in this phase.
- [ ] Every page's `<title>` and `<meta name="description">` match the approved draft title and meta description from the corresponding page brief (updated only if the brief was updated at a gate).
- [ ] OG metadata (`og:title`, `og:description`, `og:url`, `og:image`) is set for every page via the Next.js Metadata API.
- [ ] An OG image exists at `public/og/<slug>.png` (1200×630) for every page — generated or composed in this phase — and each page's `og:image` points to its file.
- [ ] The 404 page is built at `app/not-found.tsx` using the approved copy from `site/copy/404.md` verbatim (the 404 page is not in the sitemap but is mandatory).
- [ ] Internal links between pages follow the internal linking plan in `site/sitemap.md` — every planned link exists and every link uses the correct URL slug.
- [ ] Every image has a non-empty, descriptive `alt` attribute that describes the image content; no `alt=""` except on decorative images explicitly marked as decorative in the copy file.
- [ ] No raw color, spacing, radius, or shadow value appears in any component or page file — only token references.
- [ ] `pnpm lint` and `pnpm typecheck` pass with zero errors across all new and modified files.
- [ ] `STATE.md` is updated: Phase 7 status set to `done`, completion date recorded.
