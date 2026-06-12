# Definition of Done — Phase 8: QA & Accessibility

Every box checked before requesting GATE 4.

- [ ] `pnpm lint` exits with zero errors and zero warnings on the entire codebase.
- [ ] `pnpm typecheck` exits with zero TypeScript errors on the entire codebase.
- [ ] `pnpm build` completes successfully with no errors.
- [ ] Lighthouse mobile scores meet or exceed the budgets set in `site/strategy.md` for Performance and Accessibility (defaults: Performance ≥ 90, Accessibility ≥ 95); scores recorded in `reports/qa.md`.
- [ ] LCP, CLS, and INP values measured by Lighthouse meet the Core Web Vitals targets set in `site/strategy.md`; values recorded in `reports/qa.md`.
- [ ] Automated axe accessibility scan against every page returns zero violations; findings and their resolutions are recorded in `reports/qa.md`.
- [ ] Manual keyboard-only navigation walkthrough completed on every page: all interactive elements are reachable by Tab, all focus indicators are visible, no keyboard trap exists; result recorded in `reports/qa.md`.
- [ ] Responsive layout verified at every breakpoint token defined in `design/tokens.json`; any visual defect found is either fixed (fix recorded) or explicitly accepted with a written justification in `reports/qa.md`.
- [ ] Copy fidelity check completed: a diff or manual audit confirms that rendered visible text on every page matches the approved copy file (`site/copy/<slug>.md`) verbatim; any discrepancy is either corrected or has a written resolution.
- [ ] Every page's rendered `<title>` and meta description match the approved page brief values; checked in browser DevTools or build output and recorded.
- [ ] Every internal link returns HTTP 200 (no 404s); every external link opens without an immediate redirect loop; findings recorded.
- [ ] `reports/qa.md` exists, covers all pages, and has no open unresolved findings.
- [ ] `process/templates/review-request.template.md` has been filled and posted in chat for GATE 4.
- [ ] `STATE.md` status is set to `blocked-pending-review` with the artifact list for GATE 4 recorded.
- [ ] Marker `REVIEW_GATE_4` has been output in chat.
