---
name: copy-validation
description: Use at Phase 4 (first half) to run a structured audit of every copy file against its page brief and strategy, log every finding, fix or explicitly defer each one, and confirm the copy is ready for wireframing.
---
# Copy Validation

## Purpose

Prove the copy works structurally and strategically before any visual design is created. A finding
caught here costs one edit; the same finding caught after GATE 3 costs a token, component, and
assembly change. Validation is a systematic pass — not a vibe check.

## Inputs

- `site/copy/<slug>.md` — all copy files from Phase 3
- `site/page-briefs/<slug>.md` — the contract each copy file must satisfy
- `site/strategy.md` — tone adjectives, messaging pillars, persona objections, banned-words list

## Outputs

- `site/copy/VALIDATION.md` — findings log (all pages, all checks, status per finding)
- Updated `site/copy/<slug>.md` files where fixes were applied

## Process

Run the following seven checks on every page in the same order. Log every finding to
`site/copy/VALIDATION.md` immediately — do not fix first and log later.

**Check 1 — Message match**
Read the page brief's "Primary message" field. Read the page's H1. Ask: does the H1 directly
express the primary message or its outcome? If not, flag it. Then read each H2 and ask: does it
serve the primary message or rebut a persona objection? Any H2 that does neither is flagged as
off-strategy.

**Check 2 — Heading hierarchy**
Count H1 tags in the copy file. There must be exactly one. Verify that H2s appear under the H1,
H3s appear under an H2, and no level is skipped (no H1 → H3). Flag every violation with the
line reference.

**Check 3 — Scannability test**
Read only the headings (H1, H2, H3) and bolded phrases in the copy file — ignore all body text.
Ask: does the argument or story of the page hold together from headings alone? If the headings
form a disconnected list of topics rather than a progression, flag the specific headings that break
the flow.

**Check 4 — CTA clarity**
Locate every CTA label in the copy file. For each one, verify it is "verb + outcome" format. Verify
it matches the primary CTA defined in the page brief. Flag any CTA that is a generic label
("Submit", "Learn more" without context, "Click here") or that contradicts the brief.

**Check 5 — Cross-page redundancy**
Compare the primary message and H2 set of this page against all other pages already validated.
Flag if two pages make the same claim at headline level without differentiation. One page may go
deeper on a claim; two pages making the same top-level claim at equal prominence is redundancy.

**Check 6 — Jargon check**
Read the copy as the primary persona would — a person in the situation described in the persona
profile, not an industry insider. Flag every term that requires domain knowledge the persona is
unlikely to have, or that contradicts the plain-language tone setting in strategy. Also check for
every word on the banned-words list in `site/strategy.md`.

**Check 7 — Length vs budget**
Compare each section's word count against the length defaults defined in the website-copywriting
skill (hero ≤ 2 sentences body, feature section ≤ 3 sentences, FAQ answer ≤ 60 words, etc.) or
against any explicit overrides noted in the copy file. Flag every section that exceeds its budget
without a written justification.

**Logging format for `site/copy/VALIDATION.md`:**
```
## <slug>
| Check | Location | Finding | Status |
|---|---|---|---|
| Message match | H1 | H1 reads "X" but primary message is "Y" | fixed |
| CTA clarity | CTA#2 | "Learn more" has no outcome | fixed |
| Length | Hero body | 87 words vs 30-word budget | won't-fix: client requested detail |
```
Status must be one of: `fixed` (copy updated) or `won't-fix: <reason>` (explicit decision, not
omission). A blank status is not allowed.

**After logging all findings:**
Apply all `fixed` items to the corresponding `site/copy/<slug>.md` files. Re-run checks 1–3 on
every page you edited to confirm fixes did not introduce new issues.

When all pages have complete entries in `VALIDATION.md` with no blank statuses, validation is
done. Hand off to the lo-fi wireframes pass (same phase).

## Quality bar

- `site/copy/VALIDATION.md` exists and has an entry for every page.
- Every finding has a status of `fixed` or `won't-fix: <reason>`.
- No page has two H1 tags — this is a hard failure, not a warning.
- The scannability test passes for every page (headings alone tell the story).
- No banned words remain in any copy file.
- Every CTA is verb + outcome format.

## Anti-patterns

- **Do not fix issues without logging them first.** Silent fixes cannot be reviewed at GATE 2.
  Log, then fix.
- **Do not mark issues "won't-fix" without a written reason.** "Won't-fix" is a decision, not
  avoidance. The reason must be specific enough that the human can agree or push back.
- **Do not treat the scannability test as optional.** If the headings don't hold the story,
  body copy cannot rescue the page. Structural problems must be fixed here.
- **Do not skip pages because they seem simple.** Every page gets every check. Simple pages
  often have the most generic headlines and the weakest CTAs.
- **Do not run validation and wireframing simultaneously.** Validation changes copy; wireframes
  are built on finalized copy. Finish all validation, apply all fixes, then start wireframes.
- **Do not accept "in progress" or blank statuses in the findings log.** GATE 2 requires a complete
  record, not a partial one.

## Done when

`process/checklists/phase-4-wireframes.md` (validation portion) is satisfied: all copy files
updated, `site/copy/VALIDATION.md` complete with no blank statuses. Proceed immediately to the
lo-fi wireframes pass (same Phase 4). The full phase-4 checklist and GATE 2 are owned by the
`lofi-wireframes` skill.
