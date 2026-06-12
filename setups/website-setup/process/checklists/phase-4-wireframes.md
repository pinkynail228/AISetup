# Definition of Done — Phase 4: Copy Validation & Lo-fi Wireframes

Every box checked before requesting GATE 2.

- [ ] `site/copy/VALIDATION.md` exists and records a validation result for every page: each finding is identified by page slug + section id, and every finding that required a copy edit is marked resolved with a note of what changed.
- [ ] After all copy edits, every page still has exactly one H1 that matches the primary message in its page brief (re-verified post-edit, not just at Phase 3 close).
- [ ] The length budget per section defined in each page brief has been checked; any page whose sections exceed budget by more than 20% has a recorded justification in `VALIDATION.md`.
- [ ] Every CTA has been validated for clarity: the action and the destination or outcome are unambiguous from the button/link text alone — no vague labels like "Click here" or "Learn more" without context.
- [ ] Every page in `site/sitemap.md` has a corresponding wireframe file at `site/wireframes/<slug>.md` written from `process/templates/wireframe.template.md`.
- [ ] Every wireframe section slot maps to at least one copy section id from the corresponding copy file — no wireframe slot references content that does not exist in the copy file.
- [ ] Wireframe section slots are ordered in mobile-first sequence (the order a single-column mobile layout would show them top to bottom).
- [ ] No wireframe file contains any color, font name, hex value, pixel value, or other visual styling — only layout hints and content-type labels.
- [ ] No wireframe file contains lorem ipsum or any fabricated content; all text references point to copy file section ids.
- [ ] Every copy file's status field has been updated to `validated`.
- [ ] Every assumption introduced during Phase 3 or 4 is listed and numbered in the relevant artifact.
- [ ] `process/templates/review-request.template.md` has been filled and posted in chat for GATE 2.
- [ ] `STATE.md` status is set to `blocked-pending-review` with the artifact list for GATE 2 recorded.
- [ ] Marker `REVIEW_GATE_2` has been output in chat.
