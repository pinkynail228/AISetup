# Definition of Done — Phase 9: Launch

Every box checked before closing the phase and declaring the project done.

- [ ] All required environment variables are set in the production environment and verified (no build-time or runtime errors caused by missing vars).
- [ ] Analytics or tracking code (if specified in `site/strategy.md`) is present, fires on page load in production, and does not throw console errors.
- [ ] `app/sitemap.ts` exists (App Router convention per `docs/stack-conventions.md`), and `/sitemap.xml` serves valid XML listing every page URL with the correct production domain.
- [ ] `app/robots.ts` exists, and `/robots.txt` correctly allows or disallows crawlers per the launch decision (default: allow all, disallow nothing on a new public site).
- [ ] All redirects from the previous site (if replacing one) are configured and return HTTP 301; verified by curl or redirect checker.
- [ ] Favicon is present in at least two sizes (16×16 and 32×32) and the Apple Touch Icon (180×180); verified in browser tab.
- [ ] OG image is present for at minimum the homepage; displayed correctly when URL is pasted into a social link preview tool (Slack, Twitter/X card validator, or equivalent).
- [ ] A custom 404 page exists at the framework level (Next.js `not-found.tsx`) and renders without error.
- [ ] Form submission (if any form exists on the site) has been tested end-to-end in production: a test submission reaches the configured delivery destination (email, webhook, CRM).
- [ ] Domain is pointed to the production deployment and HTTPS is active with a valid certificate; `https://` URL loads without mixed-content warnings.
- [ ] Post-deploy smoke check completed: every page URL loads with HTTP 200 on the live domain; recorded in `reports/launch-checklist.md`.
- [ ] `reports/launch-checklist.md` exists and every item is checked with a pass/fail result and date.
- [ ] `STATE.md` is updated: Phase 9 status set to `done`, project status set to `done`, completion date recorded, and a brief summary of where every major artifact lives is added to the file.
