---
name: website-copywriting
description: Use at Phase 3 to write complete, real copy for every page in the site language, working strictly from approved page briefs and strategy, with no placeholders.
---
# Website Copywriting

## Purpose

Produce finished, publishable copy for every page. Copy defines structure — sections are named
and ordered by what the words need, not by what "looks good." No lorem ipsum, no "copy TBD,"
no stand-in headlines.

## Inputs

- `site/strategy.md` — voice, tone adjectives, messaging pillars, persona objections
- `site/sitemap.md` — page list and hierarchy
- `site/page-briefs/<slug>.md` — one per page; primary message, section outline, CTA, length context
- `process/templates/copy-page.template.md` — output template

## Outputs

- `site/copy/<slug>.md` — one file per page, in the site language defined in `site/strategy.md`

## Process

1. Confirm the site language from `site/strategy.md`. Write all copy in that language from the
   first word. Do not write in English first and translate — write directly in the target language.

2. Order pages by importance to the primary goal (typically: home page first, then the page most
   likely to convert, then supporting pages). Write in that order so tone is set before supporting
   pages try to match it.

3. For each page, read its brief fully before writing a single word. The brief's primary message
   is the page's anchor — every section must serve it or set it up.

4. Apply the **message hierarchy** within each page:
   - The H1 states the primary message or its direct outcome — not the product category or company name
   - Each H2 section advances the argument or answers an objection from the persona profile
   - Body copy under each H2 provides one idea only; if you have two ideas, use two sections
   - No section repeats a claim already made in a previous section at the same level of detail

5. Apply **headline craft rules:**
   - Clarity beats cleverness: a confused reader leaves; a delighted reader stays but rarely converts better
   - State value or outcome, not category: "Cut review cycles from days to hours" not "The Review Tool"
   - Avoid "we" as the subject of headlines: lead with the user's outcome or situation
   - Maximum one exclamation mark in the entire page; zero preferred

6. Apply **voice consistency mechanics:**
   - Open `site/strategy.md` and copy out the tone adjectives — keep them visible while writing
   - After each section, check: does this sentence sound like those adjectives? If not, rewrite it
   - Maintain a **banned-words list** in `site/strategy.md` under "Voice → Banned words" (e.g.,
     "revolutionary", "seamless", "world-class", "robust", "leverage" — add any word that is
     category-generic rather than specific to this product). Never use a banned word

7. Write **CTA copy** as verb + outcome: "Start your free trial", "Book a 30-minute demo",
   "Download the security guide" — not "Submit", "Click here", "Learn more" without context.
   Every CTA matches the primary CTA defined in the page brief.

8. Write **microcopy** for every interactive element on the page:
   - Button labels (all of them, not just primary CTAs)
   - Form field labels and placeholder text (placeholders are supplementary, not the label)
   - Inline validation messages (error and success)
   - Empty states if applicable
   - Footer tagline or mission fragment
   - 404 page copy → written to `site/copy/404.md` (friendly, actionable, includes a link back to home)

9. Observe **length discipline.** Each page brief's section outline defines the number of sections.
   Without wireframe constraints at this stage, apply these defaults per section:
   - Hero / lead section: 1 headline + 1 subhead (1–2 sentences) + 1 CTA label
   - Feature / argument section: 1 H2 + 1–3 sentences body + optional supporting detail
   - Social proof / evidence section: 1–3 testimonials or data points, each ≤ 40 words
   - FAQ-style section: question as H3, answer ≤ 60 words
   - Closing CTA section: 1 headline + 1–2 sentences + 1 CTA label
   Exceeding these budgets requires a written justification in the copy file.

10. Save each page as `site/copy/<slug>.md` using the template. Include section names as H2 headings
    so the validation pass can match them to the brief's section outline.

11. After writing all pages, do a single cross-page pass: verify no two pages make identical claims
    at the same level of prominence. Differentiate or consolidate.

## Quality bar

- Every H1 states a value or outcome; none is a company name or product category alone.
- Every section in every page file maps to a section in the corresponding page brief.
- CTAs are all verb + outcome; no "submit" or "click here" labels remain.
- Microcopy is present for every form field, button, and error state referenced in the brief.
- No banned words (from `site/strategy.md`) appear anywhere in the copy.
- The scannability test passes informally: reading only H1 + H2s tells the page's story.
- Copy is written in the strategy-defined site language throughout — no English fragments in
  non-English copy.

## Anti-patterns

- **Do not write copy without re-reading the persona objections.** Copy that ignores objections
  fails at validation. Each major objection should be addressed somewhere on the relevant page.
- **Do not use category headlines.** "Our Features" and "Why Choose Us" are non-headlines. Every
  heading must carry meaning specific to this product.
- **Do not treat CTAs as afterthoughts.** CTA copy is the most read element on the page. Write it
  first in each section, then write the body that earns it.
- **Do not repeat the same claim across H2s.** Repetition signals you ran out of arguments. Either
  deepen the claim with evidence or remove the section.
- **Do not write placeholder microcopy.** "Error" and "Field required" are not acceptable error
  messages. Every error message names the problem and the fix.
- **Do not begin validation in this phase.** Writing and validation are separate phases to keep
  them honest. Finish all pages, then hand off to Phase 4.

## Done when

`process/checklists/phase-3-copy.md` is fully satisfied. No gate follows Phase 3 — continue
directly to Phase 4 (copy validation and lo-fi wireframes).
