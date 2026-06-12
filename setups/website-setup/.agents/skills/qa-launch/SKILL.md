---
name: qa-launch
description: Use at Phase 8 to run systematic QA against every budget and approved artifact, then at Phase 9 to execute the launch checklist and ship deliberately.
---
# QA & Launch

This skill covers two sequential phases. Complete Phase 8 in full and pass GATE 4 before starting
Phase 9.

---

## Part 1 — Phase 8: QA & Accessibility

### Purpose

Verify the built site against every budget set in strategy, every approved copy artifact, and
every accessibility requirement. Find and fix all failures before the human sees the final site.
Log every finding — GATE 4 reviewers see the QA report alongside the site.

### Inputs

- Built Next.js application (`pnpm build` passing is a prerequisite)
- `site/strategy.md` — performance and accessibility budgets (defaults: Lighthouse perf ≥ 90 mobile,
  a11y ≥ 95)
- `site/copy/<slug>.md` — approved copy for fidelity check
- `site/page-briefs/<slug>.md` — metadata values for OG validation
- `site/sitemap.md` — internal link plan for link check
- `design/tokens.json` — breakpoint tokens for responsive check

### Outputs

- `reports/qa.md` — every finding with severity, page, description, fix applied, and status

### Process

**Step 1 — Static checks (must all pass before any other step)**
Run in sequence:
```
pnpm lint
pnpm typecheck
pnpm build
```
Any failure is a blocker. Fix it, re-run, confirm it passes, then continue. Log failures and
fixes in `reports/qa.md` under "Static checks."

**Step 2 — Lighthouse audit**
Run Lighthouse in mobile mode (throttled, simulated mobile) on every page. Collect:
- Performance score
- Accessibility score
- Best Practices score
- SEO score

Compare against budgets in `site/strategy.md`. If budgets are not set, use defaults: performance
≥ 90, accessibility ≥ 95. Log each page's scores. For every page below budget, identify the
specific failing audit(s), fix them, and re-run until the page passes. Log every finding and fix.

**Step 3 — Axe accessibility audit**
Run `axe` (via `@axe-core/cli` or browser extension) against every page. Axe catches violations
Lighthouse misses (e.g., duplicate IDs, missing list structure, button name failures). Log every
violation with its rule ID, element selector, and fix. Treat all Critical and Serious violations
as blockers. Log Moderate findings and state whether fixed or explicitly deferred with reason.

**Step 4 — Manual keyboard navigation walkthrough**
Without a mouse, navigate every page from top to bottom:
- Tab through all interactive elements; verify each one receives a visible focus ring
- Activate every button and link with Enter/Space; verify correct behavior
- Navigate any modal or dropdown with arrow keys if applicable
- Verify skip-to-content link is the first Tab stop and works
- Verify no focus traps outside of intentional modal contexts

Log every failure. Fix it before continuing.

**Step 5 — Responsive check at every breakpoint token**
Open every page at each breakpoint defined in `design/tokens.json` (e.g., sm/md/lg/xl/2xl).
Verify:
- Slot order matches the wireframe's mobile-first order at every width
- No content overflows its container
- No text is truncated or overlaps another element
- Images scale without distortion

Log failures with breakpoint name and description.

**Step 6 — Copy fidelity check**
For every page, diff the rendered text (copy from the browser) against the approved copy in
`site/copy/<slug>.md`. Every H1, H2, H3, paragraph, button label, and form label must match
exactly. Flag any discrepancy — even punctuation — as a finding. Fix by correcting the component,
not the copy file (copy files are approved artifacts).

**Step 7 — Metadata and OG validation**
For every page:
- Verify `<title>` matches the page brief's draft title, ≤ 60 characters
- Verify `<meta name="description">` matches the brief's meta description, ≤ 155 characters
- Verify `og:title` and `og:description` are present
- Verify `og:image` is set (requires a real image, not a placeholder)
- Verify canonical URL is correct

Use a tool (e.g., `curl -s <url> | grep -E 'title|description|og:'` or a head tag inspector) to
validate the rendered HTML, not just the Next.js metadata export.

**Step 8 — Internal link check**
For every internal link defined in `site/sitemap.md`, verify:
- The link is present on the correct page
- The href resolves to an existing route (no 404)
- The link text is descriptive (not "click here")

Log any broken or missing link.

**`reports/qa.md` format:**
```
## Static checks
| Check | Result | Notes |
|---|---|---|
| pnpm lint | pass | — |
| pnpm typecheck | pass | — |
| pnpm build | pass | — |

## Lighthouse (mobile)
| Page | Perf | A11y | BP | SEO | Status |
|---|---|---|---|---|---|
| / | 94 | 97 | 100 | 100 | pass |

## Axe findings
| ID | Page | Selector | Severity | Fix | Status |
|---|---|---|---|---|---|

## Keyboard walkthrough
...

## Copy fidelity
...

## Metadata/OG
...

## Internal links
...
```

### Phase 8 Quality bar

- `pnpm lint`, `pnpm typecheck`, `pnpm build` all pass with zero errors.
- Every page meets or exceeds the Lighthouse budgets from `site/strategy.md`.
- No axe Critical or Serious violations remain.
- Every interactive element has a visible focus ring in the keyboard walkthrough.
- Rendered copy matches `site/copy/` exactly on every page.
- Every page's `<title>` and `<meta description>` match the approved page brief values.
- `reports/qa.md` is complete: every finding has a status of `fixed` or `won't-fix: <reason>`.

### Phase 8 Anti-patterns

- **Do not skip the copy fidelity check.** Drifted copy means the approved artifact and the live
  site disagree — that is an unreviewable state.
- **Do not run only automated checks.** Axe and Lighthouse miss real keyboard navigation failures.
  The manual walkthrough is required, not optional.
- **Do not defer Lighthouse failures to "post-launch optimization."** The budgets in strategy.md
  are acceptance criteria. A site below budget is not ready to ship.
- **Do not mark axe violations "won't-fix" without a documented reason.** Every accessibility
  finding requires a disposition; silence is not a disposition.
- **Do not fix copy in components.** If the rendered copy differs from the copy file, the component
  is wrong, not the copy file. Fix the component.
- **Do not begin Phase 9 without GATE 4 approval.** The QA report is the review artifact; the
  human confirms the site is shippable.

### Phase 8 Done when

`process/checklists/phase-8-qa.md` is fully satisfied. **GATE 4 follows** — update `STATE.md`
to `blocked-pending-review`, list `reports/qa.md` and the running site (dev server or preview
deployment) as review artifacts, fill `process/templates/review-request.template.md`, output
`REVIEW_GATE_4`, and stop.

---

## Part 2 — Phase 9: Launch

### Purpose

Ship the site through a verified checklist, not a single deploy command. Every item is checked
and recorded. Launch is complete when `reports/launch-checklist.md` is fully ticked and the live
URL is confirmed working.

### Inputs

- GATE 4 approval confirmed in `STATE.md`
- Running `pnpm build` output
- Access to hosting platform (propose Vercel unless the human specified otherwise)
- `site/strategy.md` — analytics choices, redirect requirements (if replacing an existing site)

### Outputs

- `reports/launch-checklist.md` — completed checklist with date and confirmation notes per item

### Process

Work through the following checklist items in order. Tick each only after confirming it:

**Pre-deploy preparation**
1. Confirm all required environment variables are defined in the hosting platform's settings
   (API keys, analytics IDs, form endpoints). List each variable by name (not value) in
   `reports/launch-checklist.md`.
2. Verify analytics is wired: the analytics script fires on page load in a preview environment
   before going live. Log the event or network request as confirmation.
3. Confirm `sitemap.xml` is generated and accessible at `/sitemap.xml`. Verify it lists all pages
   with correct URLs for the production domain.
4. Confirm `robots.txt` is present at `/robots.txt`. Verify it allows crawling (or restricts it
   correctly if the brief specifies).
5. If this site replaces an existing site, verify all old URLs have redirects configured. List
   every redirect rule in `reports/launch-checklist.md`.
6. Verify favicon is present (32×32 .ico and 180×180 apple-touch-icon.png minimum) and renders
   correctly in a browser tab.
7. Verify OG images exist as real, non-placeholder images for every page with an `og:image` tag.
   Test with a social preview tool (e.g., opengraph.xyz or LinkedIn post inspector).
8. Verify the 404 page renders a friendly, actionable message with a link back to the home page.
9. Submit a test form submission and confirm delivery to the configured endpoint or email.
10. Confirm domain is pointed at the deployment and SSL certificate is valid (HTTPS only).

**Deploy**
11. Run the production deploy via Vercel (or the human-specified platform). Capture the deploy
    URL and deployment ID in `reports/launch-checklist.md`.

**Post-deploy smoke checks (on the live URL)**
12. Load every page in the site on the live URL. Confirm each loads without error (HTTP 200).
13. Run a Lighthouse check on the live home page. Confirm performance and accessibility scores
    still meet budgets (CDN and caching can change scores).
14. Click every primary CTA and verify it routes to the correct destination.
15. Submit the contact/lead form (if present) on the live URL and confirm delivery.
16. Check the live URL in a social preview tool to confirm OG image and title render correctly.
17. Verify `sitemap.xml` on the live domain returns valid XML and all URLs use the production domain.

**Completion**
18. Complete `reports/launch-checklist.md` — every item ticked, with date and confirmation note.
19. Update `STATE.md` to `complete`.
20. Output a short handover summary in chat: where every key file lives, the live URL, and any
    items explicitly deferred with their reasons.

### Phase 9 Quality bar

- Every item in `reports/launch-checklist.md` is ticked with a confirmation note, or explicitly
  marked "deferred: <reason>" with human acknowledgment.
- The live site loads all pages over HTTPS with no console errors.
- Lighthouse scores on the live URL meet the budgets from `site/strategy.md`.
- OG images render correctly in at least one social preview tool.
- `STATE.md` is updated to `complete` with the launch date recorded.

### Phase 9 Anti-patterns

- **Do not deploy without completing the pre-deploy checklist.** Missing environment variables
  silently break forms, analytics, and third-party integrations on the live site.
- **Do not skip the post-deploy smoke checks.** CDN configuration, environment differences, and
  domain routing have each broken sites that passed staging. Smoke checks are the last net.
- **Do not launch without a real 404 page.** A framework default 404 or a blank page is not
  acceptable. The 404 page was part of Phase 3 copy; verify it deployed.
- **Do not skip the redirect list if replacing an existing site.** Broken inbound links and lost
  SEO authority are not recoverable after launch without effort; the time to prevent them is now.
- **Do not consider launch complete without confirming form delivery on the live URL.**
  Forms that worked in staging frequently fail in production due to environment variable or
  CORS differences.
- **Do not leave `STATE.md` in a non-terminal state after launch.** Mark `complete`, record the
  date, and write the handover summary so the project is resumable from files if anyone returns.

### Phase 9 Done when

`process/checklists/phase-9-launch.md` is fully satisfied and `reports/launch-checklist.md` is
complete. Update `STATE.md` to `complete`. The project is done — hand over with a summary of the
live URL and all key artifact locations.
